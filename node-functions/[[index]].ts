import {Context, Hono} from 'hono'
import {cors} from "hono/cors";
import {updated} from "../src/share/zones";


export const app = new Hono()

// API-更新域名回源信息 =========================================================
app.use('/api/:cloud/zones/update', async (c: Context): Promise<any> => {
    const cloud: string = c.req.param('cloud')
    return await updated(c, cloud)
})

// API-创建域名回源信息 =========================================================
app.use('/api/:cloud/zones/create', async (c: Context): Promise<any> => {
    const cloud: string = c.req.param('cloud')
    return await updated(c, cloud)
})

// API-删除域名回源信息 =========================================================
app.use('/api/:cloud/zones/delete', async (c: Context): Promise<any> => {
    const cloud: string = c.req.param('cloud')
    return await updated(c, cloud)
})

// API-获取域名回源信息 =========================================================
app.use('/api/:cloud/zones/source', async (c: Context): Promise<any> => {
    const cloud: string = c.req.param('cloud')
    return await updated(c, cloud)
})

// 跨域处理 =====================================================================
app.use('/*', cors());
export default app
