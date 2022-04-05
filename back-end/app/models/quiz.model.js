
const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')
const NotFoundError = require("../utils/errors/not-found-error");

module.exports = new BaseModel('Quiz', {
  label: Joi.string().required(),
  themeId: Joi.number(),
  questions: Joi.array(),
})
