import GamesRepository from "../models/games.js"
import CategoryService from "./categories.js"
import Service from "./service.js"



export default class CartService extends Service {
  constructor() {
    super(GamesRepository)
  }

  async create(game) {
    let model = this.repository(game)
    await model.save()
    return model
  }

}
