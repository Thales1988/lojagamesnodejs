/* eslint-disable no-dupe-keys */
/* eslint-disable space-before-function-paren */
/* eslint-disable indent */
/* eslint-disable padded-blocks */
import games from '../models/games.js'
import { CartRepository } from '../models/index.js'
import Service from './service.js'

export default class CartService extends Service {
  constructor() {
    super(CartRepository)
  }

  async addCart(game, _id) {

    const pago = await this.repository.findOne({ _id })

    if ((pago === null) || (pago && (pago.payed === true))) {
      const model = this.repository(game)
      await model.save()
      return model
    }

    const { user, ...rest } = game

    await this.repository.findOneAndUpdate({ _id: pago._id },
      ({ $push: rest }))
    return this.repository.findOne(_id)
  }

  async paying(payed, id) {
    return await this.repository.findOneAndUpdate(id, payed, { rawResult: true })
  }

  async delGame(cartId, game) {
    const cart = await this.repository.findOne(cartId)

    const index = cart.games.findIndex(value => value == game)
    cart.games.splice(index, 1)
    cart.amount.splice(index, 1)

    return await cart.save()
  }
}
