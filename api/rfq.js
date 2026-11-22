import { put } from '@vercel/blob';
import { createHandler } from '../worker.mjs';

const handler = createHandler({});

export default {
  fetch(request) {
    const token = process.env.BLOB_READ_WRITE_TOKEN;
    const destination = token ? {
      put(key, value) {
        return put(key, value, { access: 'private', contentType: 'application/json', token });
      },
    } : undefined;
    return handler.fetch(request, { BUCKET: destination });
  },
};
