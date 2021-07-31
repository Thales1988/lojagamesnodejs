import express from 'express'
import { CategoryService } from '../services/index.js'
import { validationCreateCategory } from '../validations/categories.js'
import validator from '../middleware/validate.js'
import auth from '../middleware/auth.js'

const service = new CategoryService()

const router = express.Router()

const prefix = 'category'

router.post(
  '/create', async (req, res) => {
    const { query } = req
    const { body } = req

    const category = await service.create(body, query)

    res.status(201).json(category)
  }
)

router.get('/search/:category', async (req, res) => {
  const category = req.params
  const categories = await service.get(category)
  res.status(200).json(categories)
})

router.delete('/delete', async (req, res) => {
  const { body } = req
  await service.delete(body)
  res.status(200).json({ sucess: true })
})

router.put('/update', async (req, res) => {
  const { query, body: update } = req
  const game = await service.put(query, update)
  res.status(200).json(game)
})

router.get('/search/:id', auth, async (req, res) => {
  const { id } = req.params
  const category = await service.getById(id)
  res.status(200).json(category)
})

export default {
  controller: router,
  prefix
}
