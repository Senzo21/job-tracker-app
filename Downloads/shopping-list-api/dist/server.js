"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const http = __importStar(require("http"));
const items = [];
let nextId = 1;
function sendJson(res, status, data) {
    const response = { success: true, data };
    res.writeHead(status, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(response));
}
function sendError(res, status, message) {
    const response = { success: false, error: { message } };
    res.writeHead(status, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(response));
}
function getRequestBody(req) {
    return new Promise((resolve, reject) => {
        let body = '';
        req.on('data', chunk => { body += chunk; });
        req.on('end', () => {
            if (!body) {
                resolve({});
                return;
            }
            try {
                resolve(JSON.parse(body));
            }
            catch (err) {
                reject(err);
            }
        });
        req.on('error', err => reject(err));
    });
}
const server = http.createServer(async (req, res) => {
    try {
        const { method, url } = req;
        if (!url) {
            sendError(res, 400, 'Invalid URL');
            return;
        }
        const parsedUrl = new URL(url, `http://${req.headers.host}`);
        const pathname = parsedUrl.pathname;
        if (pathname === '/items') {
            if (method === 'GET') {
                sendJson(res, 200, items);
            }
            else if (method === 'POST') {
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
                const newItem = {
                    id: nextId++,
                    name: name.trim(),
                    quantity: quantity.trim(),
                    purchased
                };
                items.push(newItem);
                sendJson(res, 201, newItem);
            }
            else {
                sendError(res, 404, 'Not Found');
            }
        }
        else if (pathname.startsWith('/items/')) {
            const parts = pathname.split('/');
            const id = parseInt(parts[2], 10);
            if (isNaN(id)) {
                sendError(res, 400, 'Invalid ID');
                return;
            }
            const item = items.find(i => i.id === id);
            if (!item) {
                sendError(res, 404, 'Item not found');
                return;
            }
            if (method === 'GET') {
                sendJson(res, 200, item);
            }
            else if (method === 'PUT') {
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
                item.name = name.trim();
                item.quantity = quantity.trim();
                item.purchased = purchased;
                sendJson(res, 200, item);
            }
            else if (method === 'DELETE') {
                const index = items.findIndex(i => i.id === id);
                if (index !== -1) {
                    items.splice(index, 1);
                    res.writeHead(204);
                    res.end();
                }
                else {
                    sendError(res, 404, 'Item not found');
                }
            }
            else {
                sendError(res, 404, 'Not Found');
            }
        }
        else {
            sendError(res, 404, 'Not Found');
        }
    }
    catch (error) {
        sendError(res, 500, 'Internal Server Error');
    }
});
server.listen(3000, () => {
    console.log(`Server running on port 3000`);
});
