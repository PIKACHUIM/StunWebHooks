import { WSContext } from 'hono/ws';
import { tunnels, reverse } from './tunnels';

export function handleWS(ws: WSContext) {
    let sub: string | undefined;
    ws.on('message', (msg) => {
        try {
            const data = JSON.parse(msg.toString());
            switch (data.type) {
                case 'register': {
                    // data.subdomain 由客户端在握手后第一条消息上报
                    sub = data.subdomain;
                    tunnels.set(sub, ws);
                    reverse.set(ws, sub);
                    break;
                }
                case 'response': {
                    // HTTP 层在 pendingRequests 中保存了 res 对象
                    // 这里简化：通过全局 Map 按 id 找到 res 并写入
                    const { id, status, headers, body } = data;
                    const res = pendingResponses.get(id);
                    if (!res) return;
                    pendingResponses.delete(id);
                    for (const [k, v] of Object.entries(headers)) res.header(k, v as string);
                    res.status(status).body(Buffer.from(body, 'base64'));
                    break;
                }
            }
        } catch {}
    });

    ws.on('close', () => {
        if (sub) tunnels.delete(sub);
    });
}

// 供 HTTP 层调用
export const pendingResponses = new Map<string, any>();