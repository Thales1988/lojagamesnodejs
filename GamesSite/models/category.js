import mongoose from 'mongoose'
const { Schema } = mongoose

const categorySchema = new Schema({
  category: {
    type: String,
    required: true,
  },
  game: {
    type: Schema.Types.ObjectId,
    ref: 'games',
    required: true,
  }
})

export default mongoose.model('categories', categorySchema)

