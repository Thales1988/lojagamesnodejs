import express from 'express'
import { UserService } from '../services/index.js'
import { validationCreateUser } from '../validations/users.js'
import validator from '../middleware/validate.js'
import auth from '../middleware/auth.js'

const service = new UserService()

const router = express.Router()

const prefix = 'user'

router.get('/health', (req, res) => {
  res.status(200).json({ message: 'Api Está Funcionando' })
})

router.post(
  '/create',
  validationCreateUser,
  validator,

  async (req, res) => {
    const { body } = req

    const user = await service.create(body)

    res.status(201).json(user)
  })

router.get('/search/:id', auth, async (req, res) => {
  const { id } = req.params
  try {
    const user = await service.getById(id)
    res.status(200).json(user)

  } catch ({ message }) {
    res.status(400).json({ message })
  }
})

router.get('/search', auth, async (req, res) => {
  const { query } = req
  try {
    const user = await service.get(query)
    res.status(200).json(user)

  } catch ({ message }) {
    res.status(400).json({ message })
  }
})

router.put('/update', auth, async (req, res) => {
  const { query, body: update } = req
  try {
    const user = await service.put(query, update)
    res.status(200).json(user)

  } catch ({ message }) {
    res.status(400).json({ message })
  }
})

router.delete('/delete', auth, async (req, res) => {
  const { query } = req
  try {
    await service.delete(query)
    res.status(200).json({ success: true })

  } catch ({ message }) {
    res.status(400).json({ message })
  }
})

export default {
  controller: router,
  prefix
}
