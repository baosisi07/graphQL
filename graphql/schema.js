// GraphQLObjectType是GraphQL.js定义的对象类型，包括name、description 和fields三个属性，其中name和description 是非必填的。fields是解析函数，在这里可以理解为查询方法
// 对于每个fields，又有name，description，type，args, resolve参数，这里的type可以理解为example方法返回的数据类型，resolve就是具体的处理方法。
import {
    graphql,
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLBoolean,
    GraphQLID,
    GraphQLList,
    GraphQLNonNull,
    isOutputType,
    isInputType,
    GraphQLInputObjectType,
    GraphQLInputType
  } from 'graphql';
  import {addOne} from '../controllers/graphqlHandler.js' 
import mongoose from 'mongoose'
const List = mongoose.model('list')

const objType = new GraphQLObjectType({
    name: 'meta',
    fields: {
        createdAt: {
            type: GraphQLString
          },
          updatedAt: {
            type: GraphQLString
          }
    }
})
let listType = new GraphQLObjectType({
    name: 'List',
    fields: {
        _id: {
        type: GraphQLID
        },
        id: {
        type: GraphQLString
        },
        title: {
        type: GraphQLString
        },
        desc: {
        type: GraphQLString
        },
        date: {
        type: GraphQLString
        },
        checked: {
        type: GraphQLBoolean
        },
        meta: {
        type: objType
        }
    }
})

const listFields = {
    type: new GraphQLList(listType),
    args: {},
    resolve() {
        return List.find({}).exec()
    }
}
let queryType = new GraphQLObjectType({ 
    name: 'getAllList',
    fields: {
        lists: listFields
    }
})
const inputType = new GraphQLInputObjectType({
    name: 'inputType',
    fields:() => ({
        id: { type: GraphQLString },
        desc: { type: GraphQLString },
        title: { type: GraphQLString },
        date: { type: GraphQLString },
        checked: { type: GraphQLBoolean }
      })
})
const outputType = new GraphQLObjectType({
    name: 'outputType',
    fields: () => ({
        id: { type: GraphQLString},
        success: { type: GraphQLBoolean }
      })
})
let mutationType = new GraphQLObjectType({
    name: 'Mutations',
    fields: {
        addOne: {
            name: 'addOne',
            args: {
                listObj: {type: inputType}
            },
            type: outputType,
            resolve(value, args) {
                let result = addOne(args.listObj)
                return result
            }
        }
    }
})
  export default new GraphQLSchema({
      query: queryType,
      mutation: mutationType
  })