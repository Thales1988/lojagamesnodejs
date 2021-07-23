import GamesRepository from "../models/games.js"
import Service from "./service.js"

export default class GameService extends Service {
  constructor() {
    super(GamesRepository)
  }

  async get(filter) {
    let { gameName, ...rest } = filter
    let query = this.repository.find().populate('category')

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
}
