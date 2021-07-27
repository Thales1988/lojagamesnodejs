import express from 'express';
import { CategoryService } from '../services/index.js';
import { validationCreateCategory } from '../validations/categories.js';
import validator from '../middleware/validate.js';
import auth from '../middleware/auth.js';

let service = new CategoryService();

const router = express.Router();

const prefix = 'category';

router.post(
  '/create', async (req, res) => {
    let { query } = req
    let { body } = req;

    let category = await service.create(body, query);

    res.status(201).json(category);
  }
);

router.get('/search/:category', async (req, res) => {
  const category = req.params;
  let categories = await service.get(category);
  res.status(200).json(categories);
});

router.delete('/delete', async (req, res) => {
  const { body } = req
  await service.delete(body)
  res.status(200).json({ sucess: true })
})

export default {
  controller: router,
  prefix,
};

