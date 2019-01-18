import Koa from 'koa'
import Router from 'koa-router'
import BodyParser from 'koa-bodyparser'
import Static from 'koa-static'
import {
    database,
    initSchema
} from './mongodb/index'


import {
    ApolloServer
} from 'apollo-server-koa'
import {
    makeExecutableSchema
} from 'graphql-tools';

import cors from 'koa-cors'

;
(async () => {
    await database()
    await initSchema()

    const app = new Koa()
    
    const router = new Router()
    const port = 4000
    app.use(cors())
    app.use(BodyParser())
    // app.use(Static(__dirname + '/'))
    app.use(router.routes())
        .use(router.allowedMethods())
    // graphql    
    const typeDefs = require('./graphql/typeDefs')
    const resolvers = require('./graphql/resolvers')
    let schema = makeExecutableSchema({
        typeDefs,
        resolvers
    })
    const apolloServer = new ApolloServer({
        schema
    });
    apolloServer.applyMiddleware({
        app
    });

    app.listen(port)
    console.log(`server is running at port ${port}`)
})()