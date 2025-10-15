import {Context} from "hono";
import {allParam, RequestBody} from "../param";
import {TencentCloud} from "../cloud/tencent";
import {AlibabaCloud} from "../cloud/aliyuns";

const map: Record<string, any> = {
    "eo": TencentCloud,
    "al": AlibabaCloud,
}

export class Zones {
    public c: Context
    public i: string
    public p: RequestBody | undefined
    public f: any

    constructor(c: Context, i: string) {
        this.c = c
        this.i = i
    }

    async initial(): Promise<void> {
        this.p = await allParam(this.c)
        this.f = new map[this.i](this.p)
    }

    async checkAll(all: boolean = true): Promise<boolean> {
        if (!this.p) return false
        // 检查参数 ==========================================================
        if (!this.p.secret_uuid || !this.p.secret_keys ||
            !this.p.domain_name || !this.p.domain_uuid) return false
        return !(all && (!this.p.public_host || !this.p.public_port));
    }

    async updated(): Promise<Response> {
        if (!(await this.checkAll()))
            return this.c.json({text: '参数错误'}, 400)
        // 更新信息 ==========================================================
        const result: Record<string, any> = await this.f.updated(this.p)
        return this.c.json(result, result.flag ? 200 : 500)
    }

    async created(): Promise<Response> {
        if (!(await this.checkAll()))
            return this.c.json({text: '参数错误'}, 400)
        // 创建信息 ==========================================================
        const result: Record<string, any> = await this.f.created(this.p)
        return this.c.json(result, result.flag ? 200 : 500)
    }

    async deleted(): Promise<Response> {
        if (!(await this.checkAll(false)))
            return this.c.json({text: '参数错误'}, 400)
        // 删除信息 ==========================================================
        const result: Record<string, any> = await this.f.deleted(this.p)
        return this.c.json(result, result.flag ? 200 : 500)
    }

    async sourced(): Promise<Response> {
        if (!(await this.checkAll(false)))
            return this.c.json({text: '参数错误'}, 400)
        // 获取信息 ==========================================================
        const result: Record<string, any> = await this.f.sourced(this.p)
        return this.c.json(result, result.flag ? 200 : 500)
    }

}
