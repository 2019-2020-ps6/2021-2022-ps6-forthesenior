const {Account} = require("../../models");
const {FilterUserFromAccount, DeleteUserFromAccount} = require("./users/userManager");
const {FilterThemeFromAccount, DeleteThemeFromAccount} = require("./quiz/themes/themeManager");

/**
 * Gets the Account
 *
 * @param accountId the id of the Account
 * @constructor
 */
const GetAccount = (accountId) => {
  const account = Account.getById(accountId)
  account.users = FilterUserFromAccount(accountId)
  account.themes = FilterThemeFromAccount(accountId)
  return account
}

/**
 * Deletes the Account
 *
 * @param accountId the id of the Account
 * @returns {*} the Account Deleted
 * @constructor
 */
const DeleteAccount = (accountId) => {
  const account = Account.getById(accountId)
  FilterUserFromAccount(accountId).forEach(user => DeleteUserFromAccount(accountId, user.id))
  FilterThemeFromAccount(accountId).forEach(theme => DeleteThemeFromAccount(accountId, theme.id))
  Account.delete(accountId)
  return account
}

module.exports = {
  GetAccount,
  DeleteAccount,
}