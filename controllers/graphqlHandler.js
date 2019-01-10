import mongoose from 'mongoose'
const List = mongoose.model('list')
// 新增
export const addOne = async (obj) => {
  console.log(obj)
  // 获取请求的数据
  const opts = obj
  
  const list = new List(opts)
  const saveList = await list.save() // 保存数据
  // 简单判断一下 是否保存成功，然后返回给前端
  let result = {}
  if (saveList) {
    result = {
      success: true,
      id: saveList.id
    }
  } else {
    result = {
      success: false,
      id: '0000000'
    }
  }
  return result
}
