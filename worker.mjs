
import { isPage, render } from './pages.mjs';
import { receiveQuote } from './rfq.mjs';

export function createHandler(assets) {
  return {
    async fetch(request, env = {}) {
      const url = new URL(request.url);
      const path = url.pathname.replace(/\/$/, '') || '/';
      if (path === '/api/rfq' && request.method === 'POST') {
        const { status, message } = await receiveQuote(request, env.BUCKET);
        const headers = { 'Cache-Control': 'no-store' };
        if (request.headers.get('Accept') === 'application/json') {
          return Response.json({ message }, { status, headers });
        }
        return new Response(render('/contact', `<section class="panel light missing"><h1>${status === 201 ? 'Request received' : 'Please try again'}</h1><p>${message}</p><a href="/contact">Return to the quote form</a></section>`), {
          status, headers: { ...headers, 'Content-Type': 'text/html; charset=utf-8' },
        });
      }
      if (!['GET','HEAD'].includes(request.method)) {
        return new Response('Method not allowed', { status: 405, headers: { Allow: path === '/api/rfq' ? 'POST' : 'GET, HEAD' } });
      }
      const asset = assets[path];
      if (asset && Object.hasOwn(assets, path)) {
        return new Response(request.method === 'HEAD' ? null : Uint8Array.from(atob(asset[1]), char => char.charCodeAt(0)), {
          headers: { 'Content-Type': asset[0], 'Cache-Control': 'public, max-age=3600', 'X-Content-Type-Options': 'nosniff' },
        });
      }
      const found = isPage(path);
      return new Response(request.method === 'HEAD' ? null : render(found ? path : '', undefined, found ? undefined : 'Page not found'), {
        status: found ? 200 : 404, headers: { 'Content-Type': 'text/html; charset=utf-8' },
      });
    },
  };
}
