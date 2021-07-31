import Service from './service.js'
import { CategoryRepository } from '../models/index.js'
import GameService from './games.js'

export default class CategoryService extends Service {
  constructor() {
    super(CategoryRepository)
  }

  async get(filter) {
    return this.repository.find(filter).populate('games')
  }

  async addCategory(category, gameId) {
    return await this.repository.findOneAndUpdate({ category }, { $push: { game: gameId } }, {
      upsert: true,
      new: true,
    })
  }

  async removeGame(gameId) {
    return this.repository.updateMany({ category }, { $pull: { category: gameId } })

  }

  async delete(category) {
    let gameService = new GameService()
    let cat = await this.repository.find(category)
    await gameService.removeCategory(cat[0]._id)
    return this.repository.findOneAndDelete(cat)
  }

  async create(category, game) {
    const gameService = new GameService()
    let add = []

    if (!game.length) { add = {} } else {
      const games = await gameService.get(game)
      add = { $push: { game: games[0]._id } }
    }

    const res = await this.repository.findOneAndUpdate(category,
      add, {
      upsert: true,
      new: true
    })

    return await gameService.addGame(res._id, game)

  }
}
