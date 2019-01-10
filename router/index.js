import Router from 'koa-router'
import { getAllList, addOne } from '../controllers/list'

import schema from '../graphql/schema'
import { ApolloServer } from 'apollo-server-koa'
const server = new ApolloServer({schema})

const router = new Router()

router.get('/getAllList', getAllList)
router.post('/addOne', addOne)
router.get('/index', (ctx,next) => {
    ctx.body = {
        data: 'hello'
    }
})
router.post('/graphql', async(ctx,next) => {
     server(ctx,next)
})
module.exports = router