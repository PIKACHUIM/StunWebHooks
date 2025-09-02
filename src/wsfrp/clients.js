import WebSocket from 'ws';
import http from 'http';

const SERVER = 'wss://127.0.0.1:8787/frp/ws/basic/stream';
const SUBDOMAIN = process.env.SUBDOMAIN || '127.0.0.1';
const LOCAL_PORT = Number(process.env.LOCAL_PORT) || 3000;

const socket = new WebSocket(SERVER);

socket.on('open', () => {
    // 1. 注册
    socket.send(JSON.stringify({ type: 'register', subdomain: SUBDOMAIN }));
    console.log(`Tunnel ${SUBDOMAIN} ready`);
});

socket.on('message', async (raw) => {
    const { type, id, method, url, headers, body } = JSON.parse(raw.toString());
    if (type !== 'request') return;

    const opts = {
        hostname: 'localhost',
        port: LOCAL_PORT,
        path: url,
        method,
        headers,
    };

    const proxyReq = http.request(opts, (res) => {
        const chunks = [];
        res.on('data', (c) => chunks.push(c));
        res.on('end', () => {
            const resBody = Buffer.concat(chunks).toString('base64');
            socket.send(
                JSON.stringify({
                    type: 'response',
                    id,
                    status: res.statusCode,
                    headers: res.headers,
                    body: resBody,
                })
            );
        });
    });

    proxyReq.on('error', () => {
        socket.send(JSON.stringify({ type: 'response', id, status: 502, headers: {}, body: '' }));
    });

    proxyReq.write(Buffer.from(body, 'base64'));
    proxyReq.end();
});