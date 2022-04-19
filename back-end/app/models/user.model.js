const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('User', {
  id: Joi.number().required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  accountId: Joi.number(),
  options: Joi.array(),
})
