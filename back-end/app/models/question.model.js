const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('Question', {
  id : Joi.number(),
  label: Joi.string().required(),
  quizId : Joi.number(),
  answers: Joi.array(),
})
