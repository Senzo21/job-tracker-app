import * as http from 'http';
import { Item } from './models/item';

const items: Item[] = [];
let nextId = 1;

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: { message: string };
}

function sendJson<T>(res: http.ServerResponse, status: number, data: T): void {
  const response: ApiResponse<T> = { success: true, data };
  res.writeHead(status, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(response));
}

function sendError(res: http.ServerResponse, status: number, message: string): void {
  const response: ApiResponse<null> = { success: false, error: { message } };
  res.writeHead(status, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(response));
}

function getRequestBody(req: http.IncomingMessage): Promise<any> {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      if (!body) { resolve({}); return; }
      try { resolve(JSON.parse(body)); }
      catch (err) { reject(err); }
    });
    req.on('error', err => reject(err));
  });
}

const server = http.createServer(async (req, res) => {
  try {
    const { method, url } = req;
    if (!url) { sendError(res, 400, 'Invalid URL'); return; }
    const parsedUrl = new URL(url, `http://${req.headers.host}`);
    const pathname = parsedUrl.pathname;

    if (pathname === '/items') {
      if (method === 'GET') {
        sendJson(res, 200, items);
      } else if (method === 'POST') {
        const body = await getRequestBody(req);
        const { name, quantity, purchased } = body;
        if (typeof name !== 'string' || !name.trim()) {
          sendError(res, 400, 'Invalid or missing "name"');
          return;
        }
        if (typeof quantity !== 'string' || !quantity.trim()) {
          sendError(res, 400, 'Invalid or missing "quantity"');
          return;
        }
        if (typeof purchased !== 'boolean') {
          sendError(res, 400, 'Invalid or missing "purchased"');
          return;
        }
        const newItem: Item = {
          id: nextId++,
          name: name.trim(),
          quantity: quantity.trim(),
          purchased
        };
        items.push(newItem);
        sendJson(res, 201, newItem);
      } else {
        sendError(res, 404, 'Not Found');
      }
    } else if (pathname.startsWith('/items/')) {
      const parts = pathname.split('/');
      const id = parseInt(parts[2], 10);
      if (isNaN(id)) { sendError(res, 400, 'Invalid ID'); return; }
      const item = items.find(i => i.id === id);
      if (!item) { sendError(res, 404, 'Item not found'); return; }

      if (method === 'GET') {
        sendJson(res, 200, item);
      } else if (method === 'PUT') {
        const body = await getRequestBody(req);
        const { name, quantity, purchased } = body;
        if (typeof name !== 'string' || !name.trim()) {
          sendError(res, 400, 'Invalid or missing "name"'); return;
        }
        if (typeof quantity !== 'string' || !quantity.trim()) {
          sendError(res, 400, 'Invalid or missing "quantity"'); return;
        }
        if (typeof purchased !== 'boolean') {
          sendError(res, 400, 'Invalid or missing "purchased"'); return;
        }
        item.name = name.trim();
        item.quantity = quantity.trim();
        item.purchased = purchased;
        sendJson(res, 200, item);
      } else if (method === 'DELETE') {
        const index = items.findIndex(i => i.id === id);
        if (index !== -1) {
          items.splice(index, 1);
          res.writeHead(204);
          res.end();
        } else {
          sendError(res, 404, 'Item not found');
        }
      } else {
        sendError(res, 404, 'Not Found');
      }
    } else {
      sendError(res, 404, 'Not Found');
    }
  } catch (error) {
    sendError(res, 500, 'Internal Server Error');
  }
});

server.listen(3000, () => {
  console.log(`Server running on port 3000`);
});
