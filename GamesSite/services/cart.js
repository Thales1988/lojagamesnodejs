/* eslint-disable no-dupe-keys */
/* eslint-disable space-before-function-paren */
/* eslint-disable indent */
/* eslint-disable padded-blocks */
import { CartRepository } from '../models/index.js'
import Service from './service.js'

export default class CartService extends Service {
  constructor() {
    super(CartRepository)
  }

  async addCart(game, _id) {

    const pago = await this.repository.findOne(_id)

    if ((pago === null) || (pago && (pago.payed === true))) {
      const model = this.repository(game)
      await model.save()
      return model
    }

    const { user, ...rest } = game

    return await this.repository.findOneAndUpdate({ _id: pago._id },
      ({ $push: rest }), {
      new: true
    })

  }

  async paying(payed, id) {
    return await this.repository.findOneAndUpdate(id, payed, { rawResult: true })

  }

  async algumacoisa(algumacoisa) {
    const oi = this.repository.indexOf(algumacoisa)

    const result = this.repository.findIndex((item) => {
      item.games = algumacoisa
    })

  }
}
