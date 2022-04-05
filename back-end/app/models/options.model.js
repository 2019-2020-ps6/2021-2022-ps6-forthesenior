const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('Theme', {
    fontSize: Joi.number().required(),
    dmlaOffset: Joi.number().required(),
    parkinsonOffset: Joi.number().required(),
    theme: Joi.boolean().required(),
})
