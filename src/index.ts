import {Context, Hono} from 'hono'
import {updated} from './cloud/tencent'
import {cors} from "hono/cors";
// import {tunnels} from "./wsfrp/tunnels";
// import {pendingResponses} from "./wsfrp/library";
// import {upgradeWebSocket} from 'hono/cloudflare-workers'
export const app = new Hono()

app.use('/*', cors());

// API-更新EO域名回源信息 =============================================================================================
app.use('/api/eo/zones/update',
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

// // FRP-申请WS隧道创建操作 =============================================================================================
// app.get('/frp/ws/basic/tunnel', upgradeWebSocket((c: Context) => {
//     const domain = new URL(c.req.url).searchParams.get('domain')
//     const clientIP = c.req.header('cf-connecting-ip') || '127.0.0.1'
//
//     return {
//         onOpen(evt: any, ws: any) {
//             console.log(`Client connected for domain: ${domain}`)
//
//             // 存储客户端连接信息到 KV
//             const key = `tunnel:${domain}`
//             const value = JSON.stringify({
//                 ip: clientIP,
//                 port: null, // 客户端会在连接后告知监听端口
//                 connected: true,
//                 timestamp: Date.now()
//             })
//
//             // 这里假设你有一个 KV 绑定叫 TUNNEL_KV
//             c.env.TUNNEL_KV.put(key, value)
//
//             // 发送确认消息
//             ws.send(JSON.stringify({type: 'connected', domain}))
//         },
//
//         async onMessage(evt, ws) {
//             const data = JSON.parse(evt.data)
//
//             if (data.type === 'register') {
//                 // 更新端口信息
//                 const key = `tunnel:${data.domain}`
//                 const existing = JSON.parse(await c.env.TUNNEL_KV.get(key) || '{}')
//                 existing.port = data.port
//
//                 c.env.TUNNEL_KV.put(key, JSON.stringify(existing))
//                 console.log(`Registered port ${data.port} for domain ${data.domain}`)
//             }
//         },
//
//         async onClose(evt, ws) {
//             console.log(`Client disconnected for domain: ${domain}`)
//             // 标记为断开连接
//             const key = `tunnel:${domain}`
//             const existing = JSON.parse(await c.env.TUNNEL_KV.get(key) || '{}')
//             existing.connected = false
//             c.env.TUNNEL_KV.put(key, JSON.stringify(existing))
//         },
//     }
// }))
//
// // FRP-使用WS隧道转发数据 =============================================================================================
// app.all('*', async (c) => {
//     const host: string | undefined  = c.req.header('host')
//     const domain: string | undefined = host.split(':')[0] // 移除端口
//
//     // 检查是否有对应的隧道
//     const tunnelKey = `tunnel:${domain}`
//     const tunnelData = await c.env.TUNNEL_KV.get(tunnelKey)
//
//     if (!tunnelData) {
//         return c.text('Tunnel not found', 404)
//     }
//
//     const tunnel = JSON.parse(tunnelData)
//
//     if (!tunnel.connected) {
//         return c.text('Tunnel not active', 503)
//     }
//
//     // 构建目标 URL
//     const targetUrl = `http://${tunnel.ip}:${tunnel.port}${c.req.path}`
//
//     // 复制原始请求头
//     const headers = new Headers(c.req.raw.headers)
//     headers.set('host', `${tunnel.ip}:${tunnel.port}`)
//
//     try {
//         // 转发请求
//         const response = await fetch(targetUrl, {
//             method: c.req.method,
//             headers: headers,
//             body: c.req.method !== 'GET' && c.req.method !== 'HEAD' ? await c.req.arrayBuffer() : undefined
//         })
//
//         // 创建新的响应
//         const newResponse = new Response(response.body, {
//             status: response.status,
//             statusText: response.statusText,
//             headers: response.headers
//         })
//
//         return newResponse
//     } catch (error) {
//         console.error('Proxy error:', error)
//         return c.text('Proxy error', 502)
//     }
// })

export default app
