import Koa from 'koa'
import Router from 'koa-router'
import BodyParser from 'koa-bodyparser'
import Static from 'koa-static'
const app = new Koa()
const router = new Router()
const port = 3000
app.use(BodyParser())
app.use(Static(__dirname + '/public'))

router.get('/hello', (ctx, next) => {
    ctx.body = 'hello'
})
app.use(router.routes())
.use(router.allowedMethods())

app.listen(port)
console.log(`server is running at port ${port}`)
