import Koa from 'koa'
import Router from 'koa-router'
import BodyParser from 'koa-bodyparser'
import Static from 'koa-static'
import { database, initSchema } from './mongodb/index'

;(async () => {
    await database()
    await initSchema()
    const graphQLroutes = require('./router/index')
    const app = new Koa()
    const router = new Router()
    const port = 3000
    app.use(BodyParser())
    app.use(Static(__dirname + '/public'))

    app.use(graphQLroutes.routes())
    app.use(router.routes())
    .use(router.allowedMethods())

    app.listen(port)
    console.log(`server is running at port ${port}`)
})()



