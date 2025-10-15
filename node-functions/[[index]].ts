import {Context, Hono} from 'hono'
import {cors} from "hono/cors";
import {updated} from "../src/share/zones";


export const app = new Hono()

// API-更域名回源信息 =========================================================
app.use('/api/:cloud/zones/update', async (c: Context): Promise<any> => {
    const cloud: string = c.req.param('cloud')
    return await updated(c, cloud)
})

// 跨域处理 ===================================================================
app.use('/*', cors());
export default app
