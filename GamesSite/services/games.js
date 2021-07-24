import GamesRepository from "../models/games.js"
import CategoryService from "./categories.js"
import Service from "./service.js"

export default class GameService extends Service {
  constructor() {
    super(GamesRepository)
  }

  async get(filter) {
    let { gameName, ...rest } = filter
    let query = this.repository.find().populate({ path: 'category', select: 'category' })

    if (gameName) {
      query = query.find({
        gameName: { $regex: gameName, $options: 'i' }
      })
    }
    query = query.find(rest)

    return query
  }

  async addGame(gameId) {
    await this.repository.findOneAndUpdate(
      { $push: { category: gameId } }
    )
  }

  async create(category, game) {
    let model = this.repository(game)
    await model.save()
    let categoryService = new CategoryService()
    let retorno = await categoryService.addCategory(category, model._id)

    await this.repository.findOneAndUpdate({ _id: model._id },
      { $push: { category: retorno._id } })

    return model
  }
}
