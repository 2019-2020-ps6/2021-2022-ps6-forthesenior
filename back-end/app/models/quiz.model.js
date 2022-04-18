const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('Quiz', {
  id : Joi.number(),
  label: Joi.string().required(),
  themeId : Joi.number(),
  questions: Joi.array(),
})
