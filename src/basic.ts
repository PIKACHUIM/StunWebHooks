import { config } from 'dotenv'
config()

import { serveStatic } from '@hono/node-server/serve-static'
import { serve } from '@hono/node-server'

// 1. 创建主应用实例
const app = new Hono()

// 2. 优先添加环境设置中间件
app.use('*', async(c, next)=>{
    c.env = {
        ...(c.env || {}),
    }
    await next()
})

// 3. 延迟导入路由（必须在中间件之后导入）
import * as index from './index'
import { Hono } from 'hono'

// 4. 挂载路由
app.route('/', index.app)

// 静态文件服务
app.use('*', serveStatic({root: 'public/'}))

serve({
    fetch: app.fetch,
    port: Number(process.env.SERVER_PORT) || 3000,
})

export default app