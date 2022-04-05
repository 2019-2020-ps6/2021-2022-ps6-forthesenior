const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('Theme', {
  themeLabel: Joi.string().required(),
  accountId: Joi.number(),
  quizzes: Joi.array(),
})
