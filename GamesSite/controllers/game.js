import express from 'express'
import GameService from '../services/games.js'

let service = new GameService()

const router = express.Router()

const prefix = 'game'

router.post('/create', async (req, res) => {
  let { body } = req

  let game = await service.create(body)

  res.status(201).json(game)
})

router.get('/search', async (req, res) => {
  const { query } = req
  let game = await service.get(query)
  res.status(200).json(game)
})

router.put('/update', async (req, res) => {
  const { query, body: update } = req
  let game = await service.put(query, update)
  res.status(200).json(game)
})

router.delete('/delete', async (req, res) => {
  const { query } = req
  let user = await service.delete(query)
  res.status(200).json({ success: true })
})

export default {
  controller: router,
  prefix,
}
