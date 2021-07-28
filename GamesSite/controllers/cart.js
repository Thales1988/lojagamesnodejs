import express from 'express'


const router = express.Router()

const prefix = 'cart'

router.post('/add/:id', async (req, res) => {

  res.status(200)
})



export default {
  controller: router,
  prefix,
}
