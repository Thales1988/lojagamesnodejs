import express from 'express'
import GameService from '../services/games.js'

let service = new GameService()

const router = express.Router()

const prefix = 'game'

router.post('/create', async (req, res) => {
  let { category, ...rest } = req.body

  let game = await service.create(category, rest)

  res.status(201).json(game)
})

router.get('/search', async (req, res) => {
  const { query } = req
  let game = await service.get(query)
  res.status(200).json(game)
})

router.put('/update', async (req, res) => {
  const { query, body: update } = req
  let game = await service.testePopulate(update)
  res.status(200).json(game)
})

router.delete('/delete', async (req, res) => {
  const { body } = req
  let user = await service.delete(body)
  res.status(200).send(user)
})

export default {
  controller: router,
  prefix,
}
