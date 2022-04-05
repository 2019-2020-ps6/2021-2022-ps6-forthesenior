const {Account} = require("../../models");
const {FilterUserFromAccount, DeleteUserFromAccount} = require("./users/userManager");

// TODO Rajouter les Quiz dans les Json

/**
 * Gets the List of Accounts
 *
 * @constructor
 */
const GetAccounts = () => {
  const accounts = Account.get()
  accounts.forEach(account => account.users = FilterUserFromAccount(account.id))
  return accounts
}

/**
 * Gets the Account
 *
 * @param accountId the id of the Account
 * @constructor
 */
const GetAccount = (accountId) => {
  const account = Account.getById(accountId)
  account.users = FilterUserFromAccount(accountId)
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
  Account.delete(accountId)
  return account
}

module.exports = {
  GetAccounts,
  GetAccount,
  DeleteAccount,
}