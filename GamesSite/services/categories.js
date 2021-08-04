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
    if (category != undefined) {
      await this.repository.findOneAndUpdate({ category }, { $push: { game: gameId } }, {
        upsert: true
      })
      return this.repository.findOne({ category })
    } else {
      throw new Error('Precisa de uma categoria')
    }
  }

  async removeGame(gameId) {
    return this.repository.updateMany({ game: gameId }, { $pull: { game: gameId } })

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

    if (game == undefined) { add = {} } else {
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
