const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('Answer', {
  answerLabel: Joi.string().required(),
  isCorrect: Joi.boolean().required(),
  questionId: Joi.number(),
})
