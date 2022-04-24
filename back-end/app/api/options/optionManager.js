const {Options, Question} = require('../../models')
const {StringToNumber} = require("../../utils/Funcions");

const createOptions = (userId,body)=> {
    if (typeof userId==='string') userId = StringToNumber(userId)
    return Options.create({...body, userId: userId})
}

module.exports = {
    createOptions
}
