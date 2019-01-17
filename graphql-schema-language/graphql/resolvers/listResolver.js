import mongoose from 'mongoose'

import {
    getList,
    addOne,
    delOne,
    editOne,
    tickOne
} from '../../controllers/graphqlHandler.js'
export default {
  Query: {
    lists: () => { 
        let result = getList()
        console.log(result)
        return result
     },
  },
  Mutation: {
    addOne: (value, arg) => {
        console.log('test', arg.listObj)
        let result = addOne(arg.listObj)
        return result
    },
    editOne: (value, arg) => {
        let result = editOne(arg.listObj)
        return result
    },
    delOne: (value,arg) => {
        let result = delOne(arg)
        return result
    },
    tickOne: (value, arg) => {
        let result = tickOne(arg)
        return result
    },
  },
}