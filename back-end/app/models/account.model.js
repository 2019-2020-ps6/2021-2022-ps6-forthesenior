const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('Account', {
  email: Joi.string().required(),
  password: Joi.string().required(),
  users: Joi.array(),
  themes: Joi.array(),
})
