import express from 'express'
import { CategoryService } from '../services/index.js'
import auth from '../middleware/auth.js'

const service = new CategoryService()

const router = express.Router()

const prefix = 'category'

router.post(
  '/create', async (req, res) => {
    const { query } = req
    const { body } = req
    try {
      const category = await service.create(body, query)

      res.status(201).json(category)

    } catch ({ message }) {
      res.status(400).json({ message })
    }
  }
)

router.get('/search/:category', async (req, res) => {
  const category = req.params
  try {
    const categories = await service.get(category)
    res.status(200).json(categories)

  } catch ({ message }) {
    res.status(400).json({ message })
  }
})

router.delete('/delete', async (req, res) => {
  const { body } = req
  try {
    await service.delete(body)
    res.status(200).json({ sucess: true })

  } catch ({ message }) {
    res.status(400).json({ message })
  }
})

router.put('/update', async (req, res) => {
  const { query, body: update } = req
  try {
    const game = await service.put(query, update)
    res.status(200).json(game)

  } catch ({ message }) {
    res.status(400).json({ message })
  }
})

router.get('/search/:id', auth, async (req, res) => {
  const { id } = req.params
  try {
    const category = await service.getById(id)
    res.status(200).json(category)

  } catch ({ message }) {
    res.status(400).json({ message })
  }
})

export default {
  controller: router,
  prefix
}
