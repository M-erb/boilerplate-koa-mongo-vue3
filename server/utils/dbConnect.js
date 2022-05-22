import config from '../config.js'
import mongoose from 'mongoose'

const initDB = () => {
  return new Promise((resolve, reject) => {
    mongoose.connect(config.dbOptions.connection.url)

    mongoose.connection.once('open', () => {
      resolve('Connected To Database')
    })

    mongoose.connection.on('error', err => {
      console.error('DB connection error: ', err)
    })

    mongoose.connection.once('error', err => {
      reject(err)
    })
  })
}

export default initDB
