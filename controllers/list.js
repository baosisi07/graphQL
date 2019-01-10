import mongoose from 'mongoose'
const List = mongoose.model('list')

export const getAllList = async (ctx, next) => {
    const listData = List.find({})
    console.log(listData)
    if(listData.length) {
        ctx.body = {
            success: true,
            data: listData
        }
    } else {
        ctx.body = {
            success: false
        }
    }
}

export const addOne = async (ctx, next) => {
    const data = ctx.request.body
    const list = new List(data)
    const saveList = await list.save()
    if(saveList) {
        ctx.body = {
            success: true,
            id: data.id
        }
    } else {
        ctx.body = {
            success: false,
            id: data.id
        }
    }
}