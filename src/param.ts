import {Context} from "hono";

export async function getParam(c: Context, key: string): Promise<string | null> {
    if (c.req.method === 'POST') {
        const body = await c.req.text();
        console.log(c.req.method, body)
        try {
            if (body) {
                const jsonBody = JSON.parse(body);
                return jsonBody[key] ?? null;
            }
        } catch (error) {
            // 如果JSON解析失败，尝试查询参数
            console.log('JSON解析失败:', error);
        }
    }
    return c.req.query(key) ?? null;
}
