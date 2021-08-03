import { body, param } from 'express-validator'

const validationCreateCart = [
  body('games')
    .isString()
    .withMessage('O jogo categoria precisa ser uma string')
    .notEmpty()
    .withMessage('É necessário pelo menos um jogo'),
  body('amount')
    .isNumeric()
    .withMessage('O amount precisa ser um number')
    .notEmpty()
    .withMessage('É necessário pelo menos um amount')

]

const validationParams = [
  param('_id')
    .notEmpty()
    .withMessage('Url precisa receber o ID')
]

export { validationCreateCart, validationParams }
