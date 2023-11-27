import config from '../config'
import mongoose from 'mongoose'

export const connectDB = () => {
  const DB: string = config.db.url.replace('<PASSWORD>', config.db.password)

  mongoose
    .connect(DB)
    .then(() => {
      console.log('DATABASE connected successfuly')
    })
    .catch((error) => {
      console.log('💥💥💥💥💥💥', error.message)
    })
}
