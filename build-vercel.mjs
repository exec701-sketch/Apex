import { createHash } from 'node:crypto';
import { cp, mkdir, readFile, writeFile } from 'node:fs/promises';
import { render } from './pages.mjs';

const output = 'dist/vercel';
const css = await readFile('style.css');
const version = createHash('sha256').update(css).digest('hex').slice(0, 12);
await mkdir(output, { recursive: true });
await Promise.all([
  cp('assets', output + '/assets', { recursive: true }),
  cp('site.js', output + '/site.js'),
  writeFile(output + '/style.css', css),
  ...['/', '/capabilities', '/equipment', '/industries', '/quality', '/about', '/contact'].map(path =>
    writeFile(output + (path === '/' ? '/index' : path) + '.html',
      render(path).replace('href="/style.css"', `href="/style.css?v=${version}"`)),
  ),
]);
