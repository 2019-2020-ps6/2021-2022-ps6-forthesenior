const {Account} = require("../../models");
const {FilterUserFromAccount, DeleteUserFromAccount} = require("./users/userManager");

//TODO Get sub Json

const DeleteAccount = (accountId) => {
  const account = Account.getById(accountId)
  FilterUserFromAccount(accountId).forEach(user => DeleteUserFromAccount(accountId, user.id))
  Account.delete(accountId)
  return account
}

module.exports = {
  DeleteAccount,
}