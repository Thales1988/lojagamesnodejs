import mongoose from 'mongoose'
const { Schema } = mongoose

const CartSchema = new Schema({
  games: [{
    type: String,
  }],
  user: {
    type: String,
  },
  Payed: {
    type: Boolean,
    default: false,
  },
})

export default mongoose.model('cart', CartSchema)


