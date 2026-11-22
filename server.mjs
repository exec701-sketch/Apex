
import { createServer } from 'node:http';
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import worker from './dist/server/index.js';

const inbox = resolve(process.env.APEX_RFQ_INBOX || '.rfq-inbox');
const BUCKET = {
  async put(key, body) {
    const location = join(inbox, key);
    await mkdir(dirname(location), { recursive: true, mode: 0o700 });
    await writeFile(location, body, { flag: 'wx', mode: 0o600 });
  },
};
const port = Number(process.env.APEX_PORT || 4173);
createServer(async (incoming, outgoing) => {
  try {
    const request = new Request(new URL(incoming.url, 'http://127.0.0.1:' + port), {
      method: incoming.method,
      headers: incoming.headers,
      ...(['GET', 'HEAD'].includes(incoming.method) ? {} : { body: incoming, duplex: 'half' }),
    });
    const response = await worker.fetch(request, { BUCKET });
    outgoing.writeHead(response.status, Object.fromEntries(response.headers));
    outgoing.end(Buffer.from(await response.arrayBuffer()));
  } catch {
    outgoing.writeHead(500);
    outgoing.end('Server error');
  }
}).listen(port, '127.0.0.1', () => console.log('Local: http://127.0.0.1:' + port));
