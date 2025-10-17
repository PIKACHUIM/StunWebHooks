import {Context, Hono} from 'hono'
import {cors} from "hono/cors";
import {Zones} from "../src/share/zones";

export const app = new Hono()

// API-更域名回源信息 =========================================================
app.use('/api/:cloud/zones/update', async (c: Context): Promise<any> => {
    const cloud: string = c.req.param('cloud')
    const zones: Zones = new Zones(c, cloud)
    await zones.initial()
    return await zones.updated()
})

// API-创建域名回源信息 =========================================================
app.use('/api/:cloud/zones/create', async (c: Context): Promise<any> => {
    const cloud: string = c.req.param('cloud')
    const zones: Zones = new Zones(c, cloud)
    await zones.initial()
    return await zones.created()
})

// API-删除域名回源信息 =========================================================
app.use('/api/:cloud/zones/delete', async (c: Context): Promise<any> => {
    const cloud: string = c.req.param('cloud')
    const zones: Zones = new Zones(c, cloud)
    await zones.initial()
    return await zones.deleted()
})

// API-获取域名回源信息 =========================================================
app.use('/api/:cloud/zones/source', async (c: Context): Promise<any> => {
    const cloud: string = c.req.param('cloud')
    const zones: Zones = new Zones(c, cloud)
    await zones.initial()
    return await zones.sourced()
})


// 跨域处理 ===================================================================
app.use('/*', cors());
export default app
