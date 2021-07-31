/* eslint-disable padded-blocks */
import express from 'express'
import auth from '../middleware/auth.js'
import CartService from '../services/cart.js'

const service = new CartService()

const router = express.Router()

const prefix = 'cart'

router.post('/add/:_id', auth, async (req, res) => {

  const { user, params, body } = req

  const cart = await service.addCart({ user: user._id, ...body }, params)

  res.status(200).json(cart)
})

router.post('/add', auth, async (req, res) => {

  const { user, body } = req

  const cart = await service.addCart({ user: user._id, ...body })

  res.status(200).json(cart)
})

router.post('/paying/:_id', auth, async (req, res) => {

  const { body, params } = req

  const cart = await service.paying(body, params)

  res.status(200).json(cart)
})

export default {
  controller: router,
  prefix
}
