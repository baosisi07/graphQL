import mongoose from 'mongoose'

const Schema = mongoose.Schema
const ObjectId = mongoose.Types.ObjectId

const listSchema = new Schema({
    title: String,
    desc: String,
    date: String,
    id: String,
    checked: Boolean,
    meta: {
        createdAt: {
        type: Date,
        default: Date.now()
        },
        updatedAt: {
        type: Date,
        default: Date.now()
        }
    }
})

listSchema.pre('save', (next) => {
    if(this.isNew) {
        this.meta.createdAt = this.meta.updatedAt = Date.now()
    } else {
        this.meta.updatedAt = Date.now()
    }
    next()
})

mongoose.model('list', listSchema)