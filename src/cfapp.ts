import {serveStatic} from 'hono/cloudflare-workers' // @ts-ignore
import manifest from '__STATIC_CONTENT_MANIFEST'
import * as index from './index'
import {Context} from "hono";


index.app.use('/', async (c: Context) => {
    return c.redirect("/index.html")
});
index.app.use("*", serveStatic({manifest: manifest, root: "./"}));

export default index.app
