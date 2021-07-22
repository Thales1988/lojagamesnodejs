import express from 'express';
import { CategoryService } from '../services/index.js';
import { validationCreateCategory } from '../validations/categories.js';
import validator from '../middleware/validate.js';
import auth from '../middleware/auth.js';

let service = new CategoryService();

const router = express.Router();

const prefix = 'category';

router.post(
  '/create',
  auth,
  validationCreateCategory,
  validator,
  async (req, res) => {
    let { body } = req;

    let category = await service.create({
      ...body,
      user: req.user._id,
    });

    res.status(201).json(category);
  }
);

router.get('/search/:category', async (req, res) => {
  const category = req.params;
  let games = await service.get(category);
  res.status(200).json(games);
});

export default {
  controller: router,
  prefix,
};

