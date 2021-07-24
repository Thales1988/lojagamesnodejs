import Service from './service.js'
import { CategoryRepository, GamesRepository } from '../models/index.js'
import GameService from './games.js'


let gameService = new GameService()

export default class CategoryService extends Service {
  constructor() {
    super(CategoryRepository)
  }

  async create(obj) {
    let model = this.repository(obj)
    await model.save()

    return model
  }

  async get(filter) {
    return this.repository.find(filter).populate('games')
  }

  async addCategory(category, gameId) {
    let categoria = await this.repository.find({
      category: category
    })
    await GamesRepository.findOneAndUpdate({ _id: gameId },
      { $push: { category: categoria[0]._id } }, {
      new: true,
    })


  }
}
