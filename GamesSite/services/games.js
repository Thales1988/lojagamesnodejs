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


  async create(category, game) {
    let model = this.repository(game)
    await model.save()

    let categoryService = new CategoryService()
    let retorno = await categoryService.addCategory(category, model._id)

    await this.repository.findOneAndUpdate({ _id: model._id },
      { $push: { category: retorno._id } })
    return this.repository.find(game).populate({ path: 'category', select: 'category' })
  }
  async delete(filter) {
    let game = await this.repository.findOne(filter)
    let categoryService = new CategoryService()
    await categoryService.removeGame(game._id)
    return this.repository.findOneAndDelete(filter)
  }
  async removeCategory(category) {
    return this.repository.updateMany({ category }, { $pull: { category } })
  }

  async addGame(category, game) {
    await this.repository.findOneAndUpdate(game,
      { $push: { category } }
    )
    return await this.repository.findOne(game)
  }
}
