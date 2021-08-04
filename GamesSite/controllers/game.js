import express from 'express'
import GameService from '../services/games.js'
import { validationCreateGames } from '../validations/games.js'

const service = new GameService()

const router = express.Router()

const prefix = 'game'

router.post('/create', validationCreateGames, async (req, res) => {
  const { category, ...rest } = req.body

  const game = await service.create(category, rest)

  res.status(201).json(game)
})

router.get('/search', async (req, res) => {
  const { query } = req
  const game = await service.get(query)
  res.status(200).json(game)
})

router.put('/update', async (req, res) => {
  const { query, body: update } = req
  const game = await service.put(query, update)
  res.status(200).json(game)
})

router.delete('/delete', async (req, res) => {
  const { body } = req
  const user = await service.delete(body)
  res.status(200).send(user)
})

router.get('/search/:id', async (req, res) => {
  const { id } = req.params
  const game = await service.getById(id)
  res.status(200).json(game)
})

export default {
  controller: router,
  prefix
}
