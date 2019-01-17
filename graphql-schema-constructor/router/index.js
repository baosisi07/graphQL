import Router from 'koa-router'
import schema from '../graphql/schema'
import {
    graphqlKoa,
    graphiqlKoa
}
from 'graphql-server-koa'


const router = new Router()

router.get('/index', (ctx, next) => {
    ctx.body = {
        data: 'hello'
    }
})
router.get('/graphql', async (ctx, next) => {
    await graphqlKoa({
        schema: schema
    })(ctx, next)
})
router.get('/graphiql', async (ctx, next) => {
    await graphiqlKoa({
        endpointURL: '/graphql'
    })(ctx, next)
})
router.post('/graphql', async (ctx, next) => {
    console.log('hello')
    await graphqlKoa({
        schema: schema
    })(ctx, next)

})
module.exports = router