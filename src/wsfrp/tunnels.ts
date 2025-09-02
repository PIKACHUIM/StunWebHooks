// 内存版，生产请替换成 Redis / Durable Objects
type Conn = WebSocket; // 客户端 WebSocket

// export const tunnels = new Map<string, Conn>();
// export const reverse = new WeakMap<Conn, string>(); // conn -> subdomain


import {DurableObject} from 'cloudflare-workers'

export class Tunnels extends DurableObject {
    // 类变量存储 ==============================================
    tunnels: Record<string, any> = {}

    // 初始化函数 ==============================================
    constructor(ctx: any, env: unknown) {
        super(ctx, env)
        ctx.blockConcurrencyWhile(async () => {
            // 初始化执行的操作 ================================

        })
    }

    // 查找WS隧道 ==============================================
    async findTunnel(name: string): Promise<any> {
        if (this.tunnels.has(name)) return this.tunnels.get(name)
        return null;
    }

    // 新增WS隧道 ==============================================
    async initTunnel(): Promise<Boolean> {

    }

    // 删除WS隧道 ==============================================
    async killTunnel(): Promise<Boolean> {

    }
}
export let tunnels = new Tunnels(ctx,env);