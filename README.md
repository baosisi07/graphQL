# graphQL Learning

## 项目目录介绍

graphql-schema-constructor目录

使用apollo-server-koa这个库
学习网络教程时搭建
使用 GraphQLSchema 构造函数创建schema，语法如下所示：
```
let queryType = new GraphQLObjectType({ 
    name: 'getAllList',
    fields: {
        lists: listFields
    }
})
```
graphql-schema-language目录

使用apollo-server-koa这个库
考虑到多个数据查询及变更，将type和resolver分开管理，每个query可定义成单个文件，清晰好管理
使用 GraphQL Schema Language实现数据查询， 语法如下所示：
```
type List {
    _id: ID,
    id: String,
    title: String,
    desc: String,
    date: String,
    checked: Boolean,
    meta: Meta
  }
  ```

## 项目介绍
此项目使用node+koa+graphQL搭建了一个完整的todoList案例，数据库使用mongodb，所以使用前需先安装好node及mongodb，项目旨在学习graphql。
项目完成后的效果如下图所示：
![效果预览](http://movie.preview.baossweb.cn/graphql.gif "graphql")

## 安装使用
1. 下载此项目到本地

        git clone git@github.com:baosisi07/graphQL.git

2. 进入任一目录并安装依赖

        npm install

3. 开启mongodb服务
4. 运行命令

        npm run start
此时会在浏览器上打开 [http://localhost:3000](http://localhost:3000)

打开http://localhost:3000/graphiql 可调试查询语句及结果

## graphQL的理解
1. graphQL是通过在其他语言当中加入相对应的graphql库去实现graphql的定义
2. GraphQL schema 中的最基本的组件是对象类型，它表示你可以从服务上获取到什么类型的对象，以及这个对象有什么字段。
3. GraphQL schema 中的根类型定义，最常用的是query(表查询，必需)，mutation(表变更，可省)
4. 好处： 所需数据完全定制，减少对服务器的请求。服务器端的代码完全跟视图解耦，后台只要维护相应的数据定义，和对数据库操作的实现。
