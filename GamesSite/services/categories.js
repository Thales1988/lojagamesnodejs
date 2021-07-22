import Service from './service.js'
import { CategoryRepository } from '../models/index.js'
import UserService from './users.js'


let userService = new UserService()

export default class CategoryService extends Service {
  constructor() {
    super(CategoryRepository)
  }

  async create(obj) {
    let model = this.repository(obj)
    await model.save()

    await userService.addPost(model.user, model._id)

    return model
  }
  async get(filter) {
    return this.repository.find(filter).populate('user')
  }
}
