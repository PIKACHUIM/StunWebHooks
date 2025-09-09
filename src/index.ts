import {Context, Hono} from 'hono'
import {updated} from './cloud/tencent'
import {cors} from "hono/cors";
export const app = new Hono()

// API-更新EO域名回源信息 =============================================================================================
app.use('/api/eo/zones/update',
    async (c: Context): Promise<any> => {
        // 获取参数 ========================================
        const secret_uuid  = getParam(c, 'secret_uuid');
        const secret_keys  = getParam(c, 'secret_keys');
        const domain_uuid  = getParam(c, 'domain_uuid');
        const domain_name  = getParam(c, 'domain_name');
        const public_host  = getParam(c, 'public_host');
        const public_port  = getParam(c, 'public_port');
        const enable_ipv6  = getParam(c, 'enable_ipv6');
        const enable_ssls  = getParam(c, 'enable_ssls');
        const header_back  = getParam(c, 'header_back');
        const origin_back  = getParam(c, 'origin_back');

        // 检查参数 ========================================
        if (!secret_uuid || !secret_keys ||
            !domain_name || !domain_uuid ||
            !public_host || !public_port
        ) {
            return c.json({text: '参数错误'}, 400)
        }

        // 更新信息 ========================================
        const result: Record<string, any> = await updated(
            secret_uuid, secret_keys,
            domain_uuid, domain_name,
            public_host, public_port,
            header_back, origin_back,
            enable_ipv6, enable_ssls,
        )
        return c.json(result, result.flag ? 200 : 500)
    })

// 工具：按优先级从 body → query 读字段
function getParam(c: Context, key: string): string | null {
    // 1. 先尝试 body（POST）
    if (c.req.method === 'POST') {
        // 如果还没解析过，可以在这里 await c.req.json() 然后缓存
        // 这里为了简单，直接拿一次
        const body = c.get('parsedBody') ?? c.req.json().catch(() => ({}));
        if (body && typeof body === 'object') {
            return (body as any)[key] ?? null;
        }
    }

    // 2. 再尝试 query（GET）
    return c.req.query(key) ?? null;
}

app.use('/*', cors());
export default app
