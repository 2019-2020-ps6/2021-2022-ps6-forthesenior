const {Theme} = require('../../../models')
const {StringToNumber} = require('../../../utils/Funcions')
const {FilterQuizFromTheme, DeleteQuizFromTheme} = require("./quizzes/quizManager");

/**
 * Creates a Theme for an Account
 *
 * @param accountId id of Account
 * @param body json of new Theme
 * @returns {{id: number}}
 * @constructor
 */
const CreateThemeForAccount = (accountId, body) => {
  if (typeof accountId === 'string') accountId = StringToNumber(accountId)
  return Theme.create({...body, accountId: accountId})
}

/**
 * List of Theme from an Account
 * @param accountId id of the Account
 * @constructor
 */
const FilterThemeFromAccount = (accountId) => {
  if (typeof accountId === 'string') accountId = StringToNumber(accountId)
  return Theme.get().filter(theme => theme.accountId === accountId)
}

/**
 * Gets a Theme from an Account
 *
 * @param accountId id of the Account
 * @param themeId id of the Theme
 * @returns {*}
 * @constructor
 */
const GetThemeFromAccount = (accountId, themeId) => {
  if (typeof themeId === 'string') themeId = StringToNumber(themeId)
  let theme = FilterThemeFromAccount(accountId).find(theme => theme === Theme.getById(themeId))
  if (theme === undefined) {
    theme = "Error Theme Not Found: 404"
  } else {
    theme = {...theme, quizzes: FilterQuizFromTheme(themeId)}
  }
  return theme
}

/**
 * Updates a Theme for an Account
 *
 * @param accountId id of the Account
 * @param themeId id of the Theme
 * @param body Json of the updated Theme
 * @returns {*}
 * @constructor
 */
const UpdateThemeFromAccount = (accountId, themeId, body) => {
  const theme = GetThemeFromAccount(accountId, themeId)
  if (typeof theme !== 'string') {
    Theme.update(themeId, body)
  }
  return theme
}

/**
 * Deletes a Theme from an Account
 *
 * @param accountId id of the Account
 * @param themeId id of the Theme
 * @constructor
 */
const DeleteThemeFromAccount = (accountId, themeId) => {
  const theme = GetThemeFromAccount(accountId, themeId)
  if (typeof theme !== 'string') {
    FilterQuizFromTheme(themeId).forEach(quiz => DeleteQuizFromTheme(themeId, quiz.id))
    Theme.delete(themeId)
  }
  return theme
}

module.exports = {
  CreateThemeForAccount, FilterThemeFromAccount, GetThemeFromAccount, UpdateThemeFromAccount, DeleteThemeFromAccount
}
