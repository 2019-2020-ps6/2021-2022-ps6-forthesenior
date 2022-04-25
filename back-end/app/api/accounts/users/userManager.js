const {User, Options} = require('../../../models')
const {StringToNumber} = require('../../../utils/Funcions')

/**
 * Creates a User for an Account
 *
 * @param accountId id of Account
 * @param body json of new User
 * @returns {{id: number}}
 * @constructor
 */
const CreateUserForAccount = (accountId, body) => {
  if (typeof accountId === 'string') accountId = StringToNumber(accountId)
  return User.create({...body, accountId: accountId})
}

/**
 * List of User from an Account
 * @param accountId id of the Account
 * @constructor
 */
const FilterUserFromAccount = (accountId) => {
  if (typeof accountId === 'string') accountId = StringToNumber(accountId)
  return User.get().filter(user => user.accountId === accountId)
}

/**
 * Gets a User from an Account
 *
 * @param accountId id of the Account
 * @param userId id of the User
 * @returns {*}
 * @constructor
 */
const GetUserFromAccount = (accountId, userId) => {
  if (typeof userId === 'string') userId = StringToNumber(userId)
  let user = FilterUserFromAccount(accountId).find(user => user === User.getById(userId))
  if (user === undefined) {
    user = "Error User Not Found: 404"
  }
  return user
}

/**
 * Updates a User for an Account
 *
 * @param accountId id of the Account
 * @param userId id of the User
 * @param body Json of the updated User
 * @returns {*}
 * @constructor
 */
const UpdateUserFromAccount = (accountId, userId, body) => {
  const user = GetUserFromAccount(accountId, userId)
  if (typeof user !== 'string') {
    User.update(userId, body)
  }
  return user
}

/**
 * Deletes a User from an Account
 *
 * @param accountId id of the Account
 * @param userId id of the User
 * @constructor
 */
const DeleteUserFromAccount = (accountId, userId) => {
  const user = GetUserFromAccount(accountId, userId)
  if (typeof user !== 'string') {
    User.delete(userId)
    Options.deleteByUserId(userId)
  }
  return user
}

module.exports = {
  CreateUserForAccount,
  FilterUserFromAccount,
  GetUserFromAccount,
  UpdateUserFromAccount,
  DeleteUserFromAccount
}