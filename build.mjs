
import { readFile, readdir, mkdir, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';

const assets = {};
for (const [path, type] of [
  ['style.css', 'text/css; charset=utf-8'],
  ['site.js', 'text/javascript; charset=utf-8'],
  ...(await readdir('assets')).map(name => ['assets/' + name, 'image/jpeg']),
]) {
  assets['/' + path] = [type, (await readFile(path)).toString('base64')];
}

const cssVersion = createHash('sha256').update(assets['/style.css'][1]).digest('hex').slice(0, 12);
const pages = (await readFile('pages.mjs', 'utf8'))
  .replace('href="/style.css"', `href="/style.css?v=${cssVersion}"`)
  .replaceAll('export function', 'function');
const rfq = (await readFile('rfq.mjs', 'utf8')).replace('export async function', 'async function');
const worker = (await readFile('worker.mjs', 'utf8')).replace(/^import .*;\r?\n/gm, '').replace('export function', 'function');
await mkdir('dist/server', { recursive: true });
await mkdir('dist/.openai', { recursive: true });
await writeFile('dist/.openai/hosting.json', await readFile('.openai/hosting.json'));
await writeFile('dist/server/index.js', [pages, rfq, worker, 'export default createHandler(' + JSON.stringify(assets) + ');'].join('\n'));
