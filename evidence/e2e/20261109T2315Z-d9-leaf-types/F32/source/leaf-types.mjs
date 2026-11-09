#!/usr/bin/env node
/**
 * D9-01 — Leaf-type inventory of `LabSnapshot` (SNAP:24-58).
 *
 * Traverses the 18 top-level fields of `LabSnapshot` in
 * `apps/web/src/client/contracts/lab-snapshot.ts` of Pepgent/Pepgent with the
 * TypeScript compiler API (`typescript/unstable/sync`, the TypeScript 7 API the
 * repo already depends on) and writes every leaf field as
 *   <leaf path>: <type>  [markers]
 * grouped per top-level field, to stdout and optionally to markdown / JSON.
 *
 * Usage:
 *   node leaf-types.mjs --pepgent <Pepgent/Pepgent checkout> [--out-md FILE] [--out-json FILE]
 *
 * Requires `typescript` resolvable from this directory (`npm install` beside
 * this file); the same dependency Pepgent/Pepgent already carries.
 */
import { createRequire } from 'node:module';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { execFileSync } from 'node:child_process';

const require_ = createRequire(import.meta.url);
const { API, SymbolFlags, TypeFlags, isUnionType, isLiteralType } = require_('typescript/unstable/sync');

const args = process.argv.slice(2);
function arg(name) {
  const i = args.indexOf(`--${name}`);
  return i === -1 ? null : args[i + 1];
}

const pepgentDir = resolve(arg('pepgent') ?? '../pepgent');
const outMd = arg('out-md');
const outJson = arg('out-json');

const snapshotFile = join(pepgentDir, 'apps/web/src/client/contracts/lab-snapshot.ts');
if (!existsSync(snapshotFile)) {
  console.error(`lab-snapshot.ts not found: ${snapshotFile}`);
  process.exit(2);
}
const tsVersion = require_('typescript/package.json').version;

// ---- open the snapshot's inferred project -----------------------------------
const api = new API();
const snapshot = api.updateSnapshot({ openFiles: [snapshotFile] });
const project = snapshot.getDefaultProjectForFile(snapshotFile);
if (!project) {
  console.error('no project for lab-snapshot.ts');
  process.exit(2);
}
const checker = project.checker;

const sourceText = readFileSync(snapshotFile, 'utf8');
const marker = 'interface LabSnapshot';
const sym = checker.getSymbolAtPosition(snapshotFile, sourceText.indexOf(marker) + marker.indexOf('LabSnapshot'));
if (!sym || sym.name !== 'LabSnapshot') {
  console.error('LabSnapshot symbol not found');
  process.exit(2);
}
const snapshotType = checker.getDeclaredTypeOfSymbol(sym);

// ---- traversal --------------------------------------------------------------
const NULLISH = TypeFlags.Undefined | TypeFlags.Null;
const PRIMITIVE = TypeFlags.String | TypeFlags.StringLiteral |
  TypeFlags.Number | TypeFlags.NumberLiteral |
  TypeFlags.Boolean | TypeFlags.BooleanLiteral |
  TypeFlags.BigInt | TypeFlags.BigIntLiteral |
  TypeFlags.ESSymbol | TypeFlags.UniqueESSymbol |
  TypeFlags.Unknown | TypeFlags.Any |
  TypeFlags.Never | TypeFlags.Void |
  TypeFlags.EnumLike | TypeFlags.EnumLiteral |
  TypeFlags.TemplateLiteral | TypeFlags.StringMapping | NULLISH;

function isPrimitiveLike(t) { return Boolean(t.flags & PRIMITIVE); }
function isNullish(t) { return Boolean(t.flags & NULLISH); }
function hasFlag(t, flag) { return Boolean(t.flags & flag); }

function docOf(sym) {
  try { return checker.getDocumentationCommentOfSymbol(sym)?.trim() || null; } catch { return null; }
}
function typeOfProp(sym) {
  const t = checker.getTypeOfSymbol(sym);
  if (t) return t;
  const decl = sym.valueDeclaration?.resolve();
  if (!decl) return undefined;
  try { return checker.getTypeOfSymbolAtLocation(sym, decl); } catch { return undefined; }
}
function tstr(t) { return checker.typeToString(t); }

function discriminantLabel(member) {
  for (const name of ['kind', 'type', 'status', 'mode', 'tag', 'group', 'role']) {
    const p = checker.getPropertyOfType(member, name);
    if (!p) continue;
    const pt = typeOfProp(p);
    if (!pt) continue;
    if (isLiteralType(pt)) return `[${name}=${JSON.stringify(pt.value)}]`;
    if (isUnionType(pt)) {
      const vals = pt.getTypes();
      if (vals?.length && vals.every((v) => isLiteralType(v))) {
        return `[${name}∈${vals.map((v) => JSON.stringify(v.value)).join('|')}]`;
      }
    }
  }
  return null;
}
function unionLabel(member, index) {
  return discriminantLabel(member)
    ?? `[${member.getAliasSymbol()?.name ?? member.getSymbol()?.name ?? `member${index}`}]`;
}

const leaves = []; // {path, type, root, optional, nullable, nullableParent, doc}
const visited = new Set(); // type ids

// Marks of the slot that holds a type:
//   optional       the property is declared with `?`, or its type union includes `undefined`
//   nullable       the type union includes `null`
//   nullableParent an ancestor slot is nullable, so the leaf is absent when that ancestor is null
function leaf(path, type, root, marks, doc) {
  leaves.push({
    path,
    type,
    root,
    optional: marks.optional,
    nullable: marks.nullable,
    nullableParent: marks.nullableParent,
    doc,
  });
}

// Marks for a child slot: the child is absent when the slot holding its parent is null.
function childMarks(parent, optional) {
  return { optional, nullable: false, nullableParent: parent.nullableParent || parent.nullable };
}

// Type text of a leaf emitted from a slot. TS prints a union with its null member, so a union keeps it
// as printed. A single member of a nullable union (an intersection member) has no null in its own text,
// so the slot's null is appended to keep the text consistent with the `(nullable)` marker.
function slotText(type, marks) {
  return marks.nullable && !isUnionType(type) ? `${tstr(type)} | null` : tstr(type);
}

function traverse(type, path, root, inherited, doc) {
  // peel nullish members out of a union; record them as marks on this slot
  const slotMembers = isUnionType(type) ? (type.getTypes() ?? []) : [type];
  const nonNull = slotMembers.filter((m) => !isNullish(m));
  let marks = inherited;
  let rest = type;
  if (nonNull.length !== slotMembers.length) {
    marks = {
      optional: inherited.optional || slotMembers.some((m) => hasFlag(m, TypeFlags.Undefined)),
      nullable: inherited.nullable || slotMembers.some((m) => hasFlag(m, TypeFlags.Null)),
      nullableParent: inherited.nullableParent,
    };
    if (nonNull.length === 0) { leaf(path, tstr(type), root, marks, doc); return; }
    rest = nonNull.length === 1 ? nonNull[0] : { fakeUnion: nonNull };
  }

  // mixed unions: expand object members, leave primitives inline
  if (rest.fakeUnion || (!rest.fakeUnion && isUnionType(rest))) {
    const members = rest.fakeUnion ?? rest.getTypes() ?? [];
    const objects = members.filter((m) => !isPrimitiveLike(m));
    const atoms = members.filter(isPrimitiveLike);
    if (objects.length === 0) {
      leaf(path, tstr(type), root, marks, doc);
      return;
    }
    if (atoms.length > 0) {
      const texts = atoms.map(tstr);
      if (marks.nullable) texts.push('null');
      leaf(`${path}*`, texts.join(' | '), root, marks, doc);
    }
    for (const [i, m] of objects.entries()) {
      traverse(m, `${path}${unionLabel(m, i)}`, root, marks, doc);
    }
    return;
  }

  if (!rest.fakeUnion && isPrimitiveLike(rest)) { leaf(path, slotText(type, marks), root, marks, doc); return; }

  if (rest.isIntersectionType?.()) {
    for (const m of rest.getTypes() ?? []) traverse(m, path, root, marks, doc);
    return;
  }

  if (checker.isTupleType(rest)) {
    for (const [i, m] of (checker.getTypeArguments(rest) ?? []).entries()) {
      traverse(m, `${path}[${i}]`, root, childMarks(marks, false), null);
    }
    return;
  }
  if (checker.isArrayType(rest)) {
    const elem = checker.getTypeArguments(rest)?.[0];
    if (elem) { traverse(elem, `${path}[]`, root, childMarks(marks, false), null); return; }
    leaf(path, slotText(type, marks), root, marks, doc);
    return;
  }

  const props = checker.getPropertiesOfType(rest);
  const indexes = checker.getIndexInfosOfType(rest);
  if (props.length === 0 && indexes.length === 0) {
    leaf(path, slotText(type, marks), root, marks, doc);
    return;
  }
  if (visited.has(rest.id)) { leaf(path, `${slotText(rest, marks)} <recursive>`, root, marks, doc); return; }
  visited.add(rest.id);
  try {
    for (const p of props) {
      const child = childMarks(marks, Boolean(p.flags & SymbolFlags.Optional));
      const pt = typeOfProp(p);
      if (!pt) { leaf(`${path}.${p.name}`, '<type unavailable>', root, child, docOf(p)); continue; }
      traverse(pt, `${path}.${p.name}`, root, child, docOf(p));
    }
    for (const info of indexes) {
      traverse(info.valueType, `${path}[${tstr(info.keyType)}]`, root, childMarks(marks, false), null);
    }
  } finally {
    visited.delete(rest.id);
  }
}

const roots = [];
for (const prop of checker.getPropertiesOfType(snapshotType)) {
  const pt = typeOfProp(prop);
  roots.push({
    name: prop.name,
    type: tstr(pt),
    doc: docOf(prop),
    leaves: 0,
  });
  traverse(
    pt,
    prop.name,
    prop.name,
    { optional: Boolean(prop.flags & SymbolFlags.Optional), nullable: false, nullableParent: false },
    docOf(prop),
  );
}
for (const l of leaves) roots.find((r) => r.name === l.root).leaves++;

// ---- output -----------------------------------------------------------------
function markers(l) {
  const parts = [
    l.optional && '(optional)',
    l.nullable && '(nullable)',
    l.nullableParent && '(nullable parent)',
  ].filter(Boolean);
  return parts.length ? `  ${parts.join(' ')}` : '';
}

let sha = 'unknown';
try {
  sha = execFileSync('git', ['-C', pepgentDir, 'rev-parse', 'HEAD'], { encoding: 'utf8' }).trim();
} catch { /* not fatal */ }

const lines = [];
lines.push('# D9-01 leaf-type inventory — `LabSnapshot` (SNAP:24-58)');
lines.push('');
lines.push(`- generated: ${new Date().toISOString()}`);
lines.push(`- tool: \`evidence/e2e/20261109T2315Z-d9-leaf-types/F32/source/leaf-types.mjs\` (typescript ${tsVersion}, \`typescript/unstable/sync\`)`);
lines.push(`- source: \`Pepgent/Pepgent@${sha}\` \`apps/web/src/client/contracts/lab-snapshot.ts\``);
lines.push(`- top-level fields: ${roots.length}`);
lines.push(`- leaf fields: ${leaves.length}`);
lines.push('');
lines.push('Path notation: `.` property, `[]` array element, `[k]` index-signature value,');
lines.push('`[kind=x]` discriminated-union member, `*` the primitive members of a union that also');
lines.push('has object members.');
lines.push('');
lines.push('Markers after a leaf type:');
lines.push('- `(optional)`: the property is declared with `?`, or its type union includes `undefined`.');
lines.push('- `(nullable)`: the value may be `null` (its type union includes `null`). The type text of a nullable leaf keeps `| null`.');
lines.push('- `(nullable parent)`: an ancestor\'s type union includes `null`, so this leaf is absent when that ancestor is null. It applies to every descendant of the nullable ancestor, not only its children.');
lines.push('');
lines.push('## Coverage — 18 root fields (SNAP:24-58)');
lines.push('');
lines.push('| # | field | root type | leaves |');
lines.push('| --- | --- | --- | --- |');
roots.forEach((r, i) => lines.push(`| ${i + 1} | \`${r.name}\` | \`${r.type}\` | ${r.leaves} |`));
lines.push('');
lines.push('## Leaves');
lines.push('');
for (const r of roots) {
  lines.push(`### \`${r.name}\` — ${r.type}`);
  if (r.doc) lines.push('', `> ${r.doc}`);
  lines.push('');
  lines.push('```');
  for (const l of leaves.filter((x) => x.root === r.name)) {
    const doc = l.doc ? `  // ${l.doc.replace(/\s+/g, ' ')}` : '';
    lines.push(`${l.path}: ${l.type}${markers(l)}${doc}`);
  }
  lines.push('```');
  lines.push('');
}

const md = lines.join('\n');
process.stdout.write(md);
if (outMd) {
  mkdirSync(dirname(resolve(outMd)), { recursive: true });
  writeFileSync(outMd, md);
}
if (outJson) {
  mkdirSync(dirname(resolve(outJson)), { recursive: true });
  writeFileSync(outJson, JSON.stringify({
    generated: new Date().toISOString(),
    source: `Pepgent/Pepgent@${sha} apps/web/src/client/contracts/lab-snapshot.ts`,
    typescript: tsVersion,
    roots,
    leaves,
  }, null, 2));
}
api.close();
if (roots.length !== 18) {
  console.error(`WARN: expected 18 root fields, got ${roots.length}`);
  process.exitCode = 1;
}
