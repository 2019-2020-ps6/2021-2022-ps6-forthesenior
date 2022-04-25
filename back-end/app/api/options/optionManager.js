const {Options, Question} = require('../../models')
const {StringToNumber} = require("../../utils/Funcions");

const createOptions = (userId,body)=> {
    if (typeof userId==='string') userId = StringToNumber(userId)
    return Options.create({...body, userId: userId})
}


const UpdateOption=(userId, body) => {

    const option = Options.get().filter(option =>option.userId ===userId)
    if (typeof option !== 'string') {
        Options.updateOption(userId, body)
    }
}

module.exports = {
    createOptions,
    UpdateOption
}
