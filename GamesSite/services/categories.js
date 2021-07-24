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
}
