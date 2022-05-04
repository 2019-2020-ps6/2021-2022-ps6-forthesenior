const {StringToNumber} = require("../../../../utils/Funcions");
const {Option} = require("../../../../models");

/**
 * Creates an Option for a User
 *
 * @param userId id of User
 * @param body json of new Option
 * @returns {{id: number}}
 * @constructor
 */
const CreateOptionForUser = (userId, body) => {
  if (typeof userId === 'string') userId = StringToNumber(userId)
  return Option.create({...body, userId: userId})
}

/**
 * List of Option from a User
 * @param userId id of the User
 * @constructor
 */
const FilterOptionFromUser = (userId) => {
  if (typeof userId === 'string') userId = StringToNumber(userId)
  return Option.get().filter(option => option.userId === userId)
}

/**
 * Gets an Option from a User
 *
 * @param userId id of the User
 * @param optionId id of the Option
 * @returns {*}
 * @constructor
 */
const GetOptionFromUser = (userId, optionId) => {
  if (typeof optionId === 'string') optionId = StringToNumber(optionId)
  let option = FilterOptionFromUser(userId).find(option => option === Option.getById(optionId))
  if (option === undefined) {
    option = "Error Option Not Found: 404"
  }
  return option
}

/**
 * Updates an Option for a User
 *
 * @param userId id of the User
 * @param optionId id of the Option
 * @param body Json of the updated Option
 * @returns {*}
 * @constructor
 */
const UpdateOptionFromUser = (userId, optionId, body) => {
  const option = GetOptionFromUser(userId, optionId)
  if (typeof option !== 'string') {
    Option.update(optionId, body)
  }
  return option
}

/**
 * Deletes an Option from a User
 *
 * @param userId id of the User
 * @param optionId id of the Option
 * @constructor
 */
const DeleteOptionFromUser = (userId, optionId) => {
  const option = GetOptionFromUser(userId, optionId)
  if (typeof option !== 'string') {
    Option.delete(optionId)
  }
  return option
}

module.exports = {
  CreateOptionForUser,
  FilterOptionFromUser,
  GetOptionFromUser,
  UpdateOptionFromUser,
  DeleteOptionFromUser
}