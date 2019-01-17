# graphQL Learning

## 项目目录介绍
graphql-schema-language文件夹下使用 GraphQL Schema Language实现数据查询， 语法如下所示：
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
graphql-schema-constructor文件夹下使用 GraphQLSchema 构造函数创建schema，语法如下所示：
```
let queryType = new GraphQLObjectType({ 
    name: 'getAllList',
    fields: {
        lists: listFields
    }
})
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

