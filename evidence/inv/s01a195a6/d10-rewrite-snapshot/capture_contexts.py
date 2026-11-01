#!/usr/bin/env python3
"""Capture GitHub REST issue contexts for the D10 rewrite review.

This is an evidence collector only: it never mutates GitHub and does not compute
or compare hashes. Every API failure is retained in the per-issue availability
record instead of being replaced with inventory data.
"""
from __future__ import annotations

import json
import re
import subprocess
import sys
from datetime import datetime, timezone
from pathlib import Path
from urllib.parse import urlparse

ROOT = Path('/tmp/d10-rewrite')
OUT = ROOT / 'context'
INVENTORIES = [
    ROOT / 'soroi.json',
    ROOT / 'Pepgent.json',
    ROOT / 'deploy.json',
    ROOT / 'images.json',
    ROOT / 'PM.json',
    ROOT / 'omp-rpc-mux.json',
]
EXAMPLES = [
    ('Pepgent', 'images', 6),
    ('Pepgent', 'images', 3),
    ('Pepgent', 'deploy', 8),
    ('Pepgent', 'deploy', 1),
]
HEADERS = ['Accept: application/vnd.github+json']


def write_json(path: Path, value: object) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(value, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')


def write_text(path: Path, value: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(value, encoding='utf-8')


def endpoint_url(owner: str, repo: str, suffix: str = '') -> str:
    return f'repos/{owner}/{repo}{suffix}'


def parse_http_status(stderr: str) -> int | None:
    match = re.search(r'HTTP (\d{3})', stderr)
    return int(match.group(1)) if match else None


def call_api(path: str) -> tuple[int, object | None, str]:
    command = ['gh', 'api', path]
    for header in HEADERS:
        command.extend(['-H', header])
    result = subprocess.run(command, text=True, capture_output=True)
    status = 200 if result.returncode == 0 else (parse_http_status(result.stderr) or 0)
    payload: object | None = None
    if result.stdout.strip():
        try:
            payload = json.loads(result.stdout)
        except json.JSONDecodeError:
            payload = {'raw_stdout': result.stdout}
    error = result.stderr.strip()
    if result.returncode != 0 and not error:
        error = f'gh exited with status {result.returncode}'
    return status, payload, error


def capture_single(endpoint: str, path: Path) -> dict[str, object]:
    status, payload, error = call_api(endpoint)
    record: dict[str, object] = {'endpoint': endpoint, 'status': status}
    if status == 200 and payload is not None:
        write_json(path, payload)
        record['captured'] = str(path.relative_to(OUT))
    else:
        record['unavailable'] = True
        record['error'] = error
        if payload is not None:
            record['error_body'] = payload
        write_json(path.with_suffix('.error.json'), record)
    return record


def capture_pages(endpoint_base: str, directory: Path) -> dict[str, object]:
    directory.mkdir(parents=True, exist_ok=True)
    pages: list[dict[str, object]] = []
    page = 1
    while True:
        endpoint = f'{endpoint_base}?per_page=100&page={page}'
        status, payload, error = call_api(endpoint)
        page_record: dict[str, object] = {'page': page, 'endpoint': endpoint, 'status': status}
        if status != 200 or not isinstance(payload, list):
            page_record['unavailable'] = True
            page_record['error'] = error or 'Successful response was not a JSON array'
            if payload is not None:
                page_record['error_body'] = payload
            write_json(directory / f'page-{page:03d}.error.json', page_record)
            pages.append(page_record)
            break
        page_path = directory / f'page-{page:03d}.json'
        write_json(page_path, payload)
        page_record['captured'] = str(page_path.relative_to(OUT))
        page_record['count'] = len(payload)
        pages.append(page_record)
        if len(payload) < 100:
            break
        page += 1
    return {
        'endpoint': endpoint_base,
        'pages': pages,
        'page_count': len(pages),
        'item_count': sum(int(p.get('count', 0)) for p in pages),
        'unavailable': any(bool(p.get('unavailable')) for p in pages),
    }


def issue_key(owner: str, repo: str, number: int) -> str:
    return f'{repo}-{number}'


def capture_issue(owner: str, repo: str, number: int, title: str | None,
                  inventory_sources: list[str], roles: list[str]) -> dict[str, object]:
    key = issue_key(owner, repo, number)
    directory = OUT / key
    directory.mkdir(parents=True, exist_ok=True)
    base = endpoint_url(owner, repo)
    issue_endpoint = f'{base}/issues/{number}'
    status, payload, error = call_api(issue_endpoint)
    issue_record: dict[str, object] = {'endpoint': issue_endpoint, 'status': status}
    issue_path = directory / 'issue.json'
    if status == 200 and payload is not None:
        write_json(issue_path, payload)
        issue_record['captured'] = str(issue_path.relative_to(OUT))
    else:
        issue_record['unavailable'] = True
        issue_record['error'] = error
        if payload is not None:
            issue_record['error_body'] = payload
        write_json(directory / 'issue.error.json', issue_record)

    comments = capture_pages(f'{base}/issues/{number}/comments', directory / 'comments')
    timeline = capture_pages(f'{base}/issues/{number}/timeline', directory / 'timeline')
    parent = capture_single(f'{base}/issues/{number}/parent', directory / 'parent.json')
    subissues = capture_pages(f'{base}/issues/{number}/sub_issues', directory / 'sub_issues')

    unavailable: list[dict[str, object]] = []
    for resource, result in [('issue', issue_record), ('comments', comments), ('timeline', timeline), ('parent', parent), ('sub_issues', subissues)]:
        if result.get('unavailable') or result.get('status') not in (None, 200):
            unavailable.append({'resource': resource, **result})
    if status == 200 and isinstance(payload, dict):
        state = payload.get('state')
        if state != 'open':
            unavailable.append({'resource': 'inventory-state-assumption', 'rest_state': state,
                                'note': 'Inventory row had no state field; REST state was not open'})
    availability = {
        'captured_at': datetime.now(timezone.utc).isoformat(),
        'owner': owner,
        'repo': repo,
        'number': number,
        'inventory_sources': inventory_sources,
        'roles': roles,
        'inventory_title': title,
        'rest_state': payload.get('state') if isinstance(payload, dict) else None,
        'issue': issue_record,
        'comments': comments,
        'timeline': timeline,
        'parent': parent,
        'sub_issues': subissues,
        'api_unavailable': unavailable,
    }
    write_json(directory / 'availability.json', availability)
    if roles:
        write_json(directory / 'example.json', {
            'roles': roles,
            'canonical_context': str(directory.relative_to(OUT)),
            'metadata': 'issue.json contains full REST metadata including body',
            'body': 'issue.json.body',
        })
        if isinstance(payload, dict):
            body = payload.get('body')
            if isinstance(body, str):
                write_text(directory / 'body.md', body)
    return {
        'key': key,
        'repo': repo,
        'number': number,
        'title': payload.get('title') if isinstance(payload, dict) else title,
        'state': payload.get('state') if isinstance(payload, dict) else None,
        'roles': roles,
        'api_unavailable_count': len(unavailable),
        'comments': comments.get('item_count', 0),
        'timeline': timeline.get('item_count', 0),
    }


def main() -> int:
    OUT.mkdir(parents=True, exist_ok=True)
    issues: dict[tuple[str, str, int], dict[str, object]] = {}
    inventory_counts: dict[str, int] = {}
    for inventory in INVENTORIES:
        rows = json.loads(inventory.read_text(encoding='utf-8'))
        inventory_counts[inventory.name] = len(rows)
        for row in rows:
            parsed = urlparse(row['url'])
            parts = parsed.path.strip('/').split('/')
            owner, repo, kind, number_text = parts[:4]
            if kind != 'issues':
                raise ValueError(f'Unexpected inventory URL: {row["url"]}')
            number = int(number_text)
            key = (owner, repo, number)
            item = issues.setdefault(key, {
                'owner': owner,
                'repo': repo,
                'number': number,
                'title': row.get('title'),
                'inventory_sources': [],
                'roles': [],
            })
            item['inventory_sources'].append(inventory.name)

    for owner, repo, number in EXAMPLES:
        item = issues.setdefault((owner, repo, number), {
            'owner': owner,
            'repo': repo,
            'number': number,
            'title': None,
            'inventory_sources': [],
            'roles': [],
        })
        role = f'example:{repo}#{number}'
        if role not in item['roles']:
            item['roles'].append(role)

    results: list[dict[str, object]] = []
    for key in sorted(issues, key=lambda k: (k[1].lower(), k[2])):
        item = issues[key]
        results.append(capture_issue(
            str(item['owner']), str(item['repo']), int(item['number']),
            item.get('title') if isinstance(item.get('title'), str) else None,
            list(item['inventory_sources']), list(item['roles']),
        ))

    example_manifest = []
    for owner, repo, number in EXAMPLES:
        key = issue_key(owner, repo, number)
        example_manifest.append({
            'owner': owner,
            'repo': repo,
            'number': number,
            'context': key,
            'metadata': f'{key}/issue.json',
            'body': f'{key}/body.md' if (OUT / key / 'body.md').exists() else f'{key}/issue.json#body',
        })
    write_json(OUT / 'examples.json', example_manifest)

    summary = {
        'captured_at': datetime.now(timezone.utc).isoformat(),
        'inventory_files': [str(p.relative_to(ROOT)) for p in INVENTORIES],
        'inventory_counts': inventory_counts,
        'inventory_issue_count': sum(inventory_counts.values()),
        'unique_issue_count_including_examples': len(issues),
        'requested_examples': [f'{repo}#{number}' for _, repo, number in EXAMPLES],
        'results': results,
        'rest_non_open_or_unavailable': [r for r in results if r['state'] != 'open' or r['api_unavailable_count']],
        'api_unavailable_total': sum(int(r['api_unavailable_count']) for r in results),
        'notes': [
            'Inventory rows contain no state field; scope is the supplied inventory set.',
            'The collector only reads GitHub REST endpoints and never edits issues.',
            'No hash was computed or used as evidence.',
        ],
    }
    write_json(OUT / 'capture-summary.json', summary)
    print(json.dumps({
        'inventory_issue_count': summary['inventory_issue_count'],
        'unique_issue_count_including_examples': summary['unique_issue_count_including_examples'],
        'api_unavailable_total': summary['api_unavailable_total'],
        'results_with_unavailable': len(summary['rest_non_open_or_unavailable']),
    }, ensure_ascii=False))
    return 0


if __name__ == '__main__':
    sys.exit(main())
