import mongoose from 'mongoose'
import config from '../config/index'
import glob from 'glob'
import { resolve } from 'path'

export const initSchema = async() => {
    glob.sync(resolve(__dirname,'./schema', '**/*.js')).forEach((filename) => {
        require(filename)
    })
    // glob.sync(resolve(__dirname, './schema', '**/*.js')).forEach(require)
    
}
export const database = async() => {
    let connectTimes = 0;

    return new Promise((resolve, reject) => {

        if(process.env.NODE_ENV !== 'production') {
            mongoose.set('debug', true)
          }
          
        mongoose.connect(config.dbPath, { useNewUrlParser: true })

        mongoose.connection.on('error', (err) => {
            console.log(err)
            reject(err)
        })

        mongoose.connection.on('disconnected', () => {
            connectTimes++
            if(connectTimes < 5) {
                mongoose.connect(config.dbPath)
            } else {
                throw new Error('数据库挂了吧！');
                
            }
        })

        mongoose.connection.once('open', () => {
            console.log('数据库连接成功！')
            resolve()
        })
    })
    
}