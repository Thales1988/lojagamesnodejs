import mongoose from 'mongoose'
const { Schema } = mongoose

const categorySchema = new Schema({
  category: {
    type: String,
    required: true,
    unique: true,
  },
  games: {
    type: Schema.Types.ObjectId,
    ref: 'games',
    required: true,
  }
})

export default mongoose.model('categories', categorySchema)
