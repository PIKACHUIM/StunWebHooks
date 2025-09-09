import {Context, Hono} from 'hono'
import {updated} from './cloud/tencent'
import {cors} from "hono/cors";
// import {tunnels} from "./wsfrp/tunnels";
// import {pendingResponses} from "./wsfrp/library";
// import {upgradeWebSocket} from 'hono/cloudflare-workers'
export const app = new Hono()

app.use('/*', cors());

// API-更新EO域名回源信息 =============================================================================================
app.post('/api/eo/zones/update',
    async (c: Context): Promise<any> => {
        // 获取参数 ========================================
        const body: Record<string, any> = await c.req.json()
        const secret_uuid: string | null = body.secret_uuid
        const secret_keys: string | null = body.secret_keys
        const domain_uuid: string | null = body.domain_uuid
        const domain_name: string | null = body.domain_name
        const public_host: string | null = body.public_host
        const public_port: string | null = body.public_port
        const enable_ipv6: string | null = body.enable_ipv6
        const enable_ssls: string | null = body.enable_ssls
        const header_back: string | null = body.header_back
        const origin_back: string | null = body.origin_back

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

export default app
