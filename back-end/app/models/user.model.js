const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('User', {
  firstname: Joi.string().required(),
  surname: Joi.string().required(),
  accountId: Joi.number(),
  options: Joi.array(),
})
