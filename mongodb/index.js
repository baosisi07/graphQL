import mongoose from 'mongoose'
import config from '../config/index'
import { resolve } from 'path';

export const database = () => {
    let connectTimes = 0;

    return new Promise((resolve, reject) => {

        if(process.env.NODE_ENV !== 'production') {
            mongoose.set('debug', true)
          }
          
        mongoose.connect(config.dbPath)

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