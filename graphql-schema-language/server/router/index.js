import Router from 'koa-router'

const router = new Router()

router.get('/index', (ctx, next) => {
    ctx.body = {
        data: 'hello'
    }
})

module.exports = router