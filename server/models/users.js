import mongoose from 'mongoose'
import argon2 from 'argon2'

const modelName = 'User'
const Schema = mongoose.Schema

const ModelSchema = new Schema({
  userName: {
    type: String,
    unique: true,
    lowercase: true,
    required: true
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  active: {
    type: Boolean,
    default: false
  }
}, { timestamps: true })

ModelSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()

  const hash = await argon2.hash(this.password)
  this.password = hash
  next()
})

ModelSchema.method('comparePassword', async function (reqPassword) {
  const isMatched = await argon2.verify(this.password, reqPassword)
  return isMatched
})

ModelSchema.static('sanitizeOutPut', async function (model, curUserModel) {
  if (model === null || model === undefined) return model
  let result = null

  if (Array.isArray(model)) {
    result = []
    for (const item of model) {
      const data = item.toObject()
      if (!curUserModel || !(curUserModel._id.equals(item.id))) {
        delete data.email
        delete data.active
        delete data.createdAt
        delete data.updatedAt
      }

      // remove regardless
      delete data.password

      result.push(data)
    }
  } else {
    const data = model.toObject()
    if (!curUserModel || !(curUserModel._id.equals(model.id))) {
      delete data.email
      delete data.active
      delete data.createdAt
      delete data.updatedAt
    }

    // remove regardless
    delete data.password
    result = data
  }

  return result
})

export default mongoose.model(modelName, ModelSchema)
