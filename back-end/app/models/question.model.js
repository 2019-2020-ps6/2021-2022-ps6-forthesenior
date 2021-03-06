const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('Question', {
  questionLabel: Joi.string().required(),
  quizId: Joi.number(),
  answers: Joi.array(),
})
