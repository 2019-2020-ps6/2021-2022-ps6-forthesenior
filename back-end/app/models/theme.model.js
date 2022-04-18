const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('Themes', {
  themeId: Joi.number(),
  themeLabel: Joi.string().required(),
  quizzes: Joi.array(),
})
