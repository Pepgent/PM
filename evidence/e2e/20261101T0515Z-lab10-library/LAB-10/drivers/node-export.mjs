import assert from 'node:assert/strict';
import { mkdtemp, mkdir, readFile, readdir, writeFile, access } from 'node:fs/promises';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
const repo = '/Users/mouriya/Ext/worktrees/feat-lab-10-library-12fb373';
const { inspectNodeDefinitions, readNodeDefinitions, UnsupportedNodeDefinition } = await import(pathToFileURL(join(repo, 'apps/web/src/server/lab/library-definition.ts')));
const library = '/Users/mouriya/Ext/code/pepgent/pepgent-lab-library';
const paths = (await readdir(join(library, 'nodes'))).filter(x => x.endsWith('.ts')).sort().map(x => `nodes/${x}`);
const nodes = await readNodeDefinitions(library, paths);
for (const node of nodes) assert.equal(node.source, await readFile(join(library, node.path), 'utf8'));
assert.equal(nodes.find(x => x.name === 'slow_step').parameters[1].defaultValue, '1000');
assert.equal(nodes.find(x => x.name === 'slow_step').signature, '(...args: [label: string] | [label: string, duration_ms: number]) => { label: string; duration_ms: number }');
assert.deepEqual(nodes.find(x => x.name === 'anneal').artifacts, [{ field: 'log', type: 'File' }]);
assert.deepEqual(nodes.find(x => x.name === 'review').artifacts, [{ field: 'report', type: 'File' }]);
const fixture = await mkdtemp('/tmp/lab10-export-');
await mkdir(join(fixture, 'nodes'));
const marker = join(fixture, 'EXECUTED');
await writeFile(join(fixture, 'nodes/aliased.ts'), `import { writeFileSync } from 'node:fs';\nimport { program as p, type File as OutputFile } from 'omp-soroi/node';\nwriteFileSync(${JSON.stringify(marker)}, 'must not execute');\ntype Outputs = { score: number; artifact: OutputFile };\nexport default p<[number], Outputs>(async (input: number = 3): Promise<Outputs> => { throw new Error('must not run'); }, { env: 'gpu-template' });\n`);
const [aliased] = await readNodeDefinitions(fixture, ['nodes/aliased.ts']);
assert.deepEqual(aliased.artifacts, [{ field: 'artifact', type: 'OutputFile' }]);
assert.equal(aliased.defaultEnvironment, "'gpu-template'");
assert.equal(aliased.parameters[0].defaultValue, '3');
await assert.rejects(access(marker));
await writeFile(join(fixture, 'nodes/unannotated.ts'), `import {program} from 'omp-soroi/node'; export default program(async (x: number) => x*2);`);
await assert.rejects(readNodeDefinitions(fixture, ['nodes/unannotated.ts']), UnsupportedNodeDefinition);
const unsupportedCases = [
  ['type_import', `import type {program} from 'omp-soroi/node'; export default program(async (x:number):Promise<number> => x);`],
  ['type_specifier', `import {type program} from 'omp-soroi/node'; export default program(async (x:number):Promise<number> => x);`],
  ['missing_template', `import {agent} from 'omp-soroi/node'; export default agent<[number],number>((x:number):string => ''+x,{env:'gpu'});`],
  ['duplicate_env', `import {program} from 'omp-soroi/node'; export default program(async (x:number):Promise<number> => x,{env:'first',env:'last'});`],
  ['program_template', `import {program} from 'omp-soroi/node'; export default program(async (x:number):Promise<number> => x,{template:'review'});`],
  ['human_options', `import {human} from 'omp-soroi/node'; export default human<[number],number>((x:number):string => ''+x,{env:'ignored'});`],
  ['computed_env', `import {program} from 'omp-soroi/node'; export default program(async (x:number):Promise<number> => x,{['env']:'gpu'});`],
  ['spread_options', `import {program} from 'omp-soroi/node'; export default program(async (x:number):Promise<number> => x,{...config});`],
  ['shorthand_template', `import {agent} from 'omp-soroi/node'; const template='review'; export default agent<[number],number>((x:number):string => ''+x,{template});`],
];
for (const [name, source] of unsupportedCases) await writeFile(join(fixture, `nodes/${name}.ts`), source);
const inspected = await inspectNodeDefinitions(fixture, ['nodes/aliased.ts','nodes/unannotated.ts',...unsupportedCases.map(([name])=>`nodes/${name}.ts`)]);
assert.equal(inspected[0].kind, 'defined');
for (const entry of inspected.slice(1)) { assert.equal(entry.kind,'unavailable'); assert.equal(entry.error.code,'not_supported'); }
const result = {
  actualLibrary: nodes.map(({name, signature, artifacts}) => ({name, signature, artifacts})),
  observations: ['Every exported source equals its actual node file.', 'slow_step preserves both declared input tuples and the default 1000.', 'anneal.log and review.report retain public File types.', 'Alias import and same-file output alias preserve artifact field.', 'Default env expression is exported literally.', 'Top-level write and callback did not execute; dependency is not installed.', 'Unannotated output raises UnsupportedNodeDefinition.'],
  constructorOutcomes: inspected.map(entry => entry.kind === 'defined' ? {name:entry.definition.name,kind:entry.kind} : {name:entry.name,kind:entry.kind,code:entry.error.code,message:entry.error.message}),
  fixture,
};
await writeFile('/tmp/lab10-export-runtime.json', JSON.stringify(result, null, 2));
console.log(JSON.stringify(result, null, 2));
