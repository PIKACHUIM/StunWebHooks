import {Context} from "hono";

export interface RequestBody {
    secret_uuid?: string | null;
    secret_keys?: string | null;
    domain_uuid?: string | null;
    domain_name?: string | null;
    public_host?: string | null;
    public_port?: string | null;
    enable_ipv6?: string | null;
    enable_ssls?: string | null;
    header_back?: string | null;
    origin_back?: string | null;
}

// 获取单个参数 ==========================================================================
export async function getParam(c: Context, key: string): Promise<string | null> {
    if (c.req.method === 'POST') {
        const body = await c.req.text();
        // console.log(c.req.method, body)
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

// 获取所有参数 ==========================================================================
export async function allParam(c: Context): Promise<RequestBody> {
    const body: RequestBody = {
        secret_uuid: await getParam(c, 'secret_uuid'),
        secret_keys: await getParam(c, 'secret_keys'),
        domain_uuid: await getParam(c, 'domain_uuid'),
        domain_name: await getParam(c, 'domain_name'),
        public_host: await getParam(c, 'public_host'),
        public_port: await getParam(c, 'public_port'),
        enable_ipv6: await getParam(c, 'enable_ipv6'),
        enable_ssls: await getParam(c, 'enable_ssls'),
        header_back: await getParam(c, 'header_back'),
        origin_back: await getParam(c, 'origin_back'),
    }
    // console.log(body)
    return body
}
