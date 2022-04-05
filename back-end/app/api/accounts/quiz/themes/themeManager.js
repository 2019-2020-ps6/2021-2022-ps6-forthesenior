const {Theme} = require('../../../../models')
const {StringToNumber} = require('../../../../utils/Funcions')

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
  return Theme.get().filter((Theme) => Theme.accountId === accountId)
}

/**
 * Gets a Theme from an Account
 *
 * @param accountId id of the Account
 * @param ThemeId id of the Theme
 * @returns {*}
 * @constructor
 */
const GetThemeFromAccount = (accountId, ThemeId) => {
  if (typeof ThemeId === 'string') ThemeId = StringToNumber(ThemeId)
  let theme = FilterThemeFromAccount(accountId).find(Theme => Theme === Theme.getById(ThemeId))
  if (theme === undefined) {
    theme = "Error Theme Not Found: 404"
  }
  return theme
}

/**
 * Updates a Theme for an Account
 *
 * @param accountId id of the Account
 * @param ThemeId id of the Theme
 * @param body Json of the updated Theme
 * @returns {*}
 * @constructor
 */
const UpdateThemeFromAccount = (accountId, ThemeId, body) => {
  const theme = GetThemeFromAccount(accountId, ThemeId)
  if (typeof theme !== 'string') {
    Theme.update(ThemeId, body)
  }
  return theme
}

/**
 * Deletes a Theme from an Account
 *
 * @param accountId id of the Account
 * @param ThemeId id of the Theme
 * @constructor
 */
const DeleteThemeFromAccount = (accountId, ThemeId) => {
  const theme = GetThemeFromAccount(accountId, ThemeId)
  if (typeof theme !== 'string') {
    Theme.delete(ThemeId)
  }
  return theme
}

module.exports = {
  CreateThemeForAccount,
  FilterThemeFromAccount,
  GetThemeFromAccount,
  UpdateThemeFromAccount,
  DeleteThemeFromAccount
}