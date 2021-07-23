import Service from './service.js'
import { CategoryRepository } from '../models/index.js'
import GameService from './games.js'


let gameService = new GameService()

export default class CategoryService extends Service {
  constructor() {
    super(CategoryRepository)
  }

  async create(obj) {
    let model = this.repository(obj)
    await model.save()

    await gameService.addGame(model._id)

    return model
  }
  async get(filter) {
    return this.repository.find(filter).populate('game')
  }
}
