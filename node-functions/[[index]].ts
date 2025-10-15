import {Context, Hono} from 'hono'
import {cors} from "hono/cors";
import {updated} from '../src/cloud/tencent'
import {getParam} from "../src/param";


export const app = new Hono()

// API-更新EO域名回源信息 =============================================================================================
app.use('/api/eo/zones/update',
    async (c: Context): Promise<any> => {
        // 获取参数 ========================================
        const secret_uuid: string | null = await getParam(c, 'secret_uuid');
        const secret_keys: string | null = await getParam(c, 'secret_keys');
        const domain_uuid: string | null = await getParam(c, 'domain_uuid');
        const domain_name: string | null = await getParam(c, 'domain_name');
        const public_host: string | null = await getParam(c, 'public_host');
        const public_port: string | null = await getParam(c, 'public_port');
        const enable_ipv6: string | null = await getParam(c, 'enable_ipv6');
        const enable_ssls: string | null = await getParam(c, 'enable_ssls');
        const header_back: string | null = await getParam(c, 'header_back');
        const origin_back: string | null = await getParam(c, 'origin_back');
        console.log(secret_uuid, secret_keys, domain_uuid, domain_name, public_host, public_port, enable_ipv6, enable_ssls, header_back, origin_back)

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
// app.use('/*', cors());
export default app
