import {Context} from "hono";
import {allParam, RequestBody} from "../param";
import {updated as eo_updated} from "../cloud/tencent";

const map: Record<string, any> = {
    'eo': eo_updated,
}

export async function updated(c: Context, i: string): Promise<Response> {
    const p: RequestBody = await allParam(c)
    // 检查参数 ==========================================================
    if (!p.secret_uuid || !p.secret_keys || !p.domain_name ||
        !p.domain_uuid || !p.public_host || !p.public_port)
        return c.json({text: '参数错误'}, 400)
    // 更新信息 ==========================================================
    const result: Record<string, any> = await map[i](
        p.secret_uuid, p.secret_keys, p.domain_uuid, p.domain_name,
        p.public_host, p.public_port, p.header_back, p.origin_back,
        p.enable_ipv6, p.enable_ssls,
    )
    return c.json(result, result.flag ? 200 : 500)
}