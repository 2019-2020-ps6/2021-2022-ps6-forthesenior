const {Router} = require('express')
const QuizRouter = require('./quizzes')
const manageAllErrors = require('../../../../utils/routes/error-management')
const {
  CreateThemeForAccount,
  FilterThemeFromAccount,
  GetThemeFromAccount,
  UpdateThemeFromAccount,
  DeleteThemeFromAccount
} = require("./themeManager");

const router = new Router({mergeParams: true})

router.use('/:themeId/quizzes', QuizRouter)

router.get('/', (req, res) => {
  try {
    res.status(200).json(FilterThemeFromAccount(req.params.accountId))
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.get('/:themeId', (req, res) => {
  try {
    res.status(200).json(GetThemeFromAccount(req.params.accountId, req.params.themeId))
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.post('/', (req, res) => {
  try {
    res.status(201).json(CreateThemeForAccount(req.params.accountId, req.body))
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.put('/:themeId', (req, res) => {
  try {
    res.status(200).json(UpdateThemeFromAccount(req.params.accountId, req.params.themeId, req.body))
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.delete('/:themeId', (req, res) => {
  try {
    res.status(200).json(DeleteThemeFromAccount(req.params.accountId, req.params.themeId))
  } catch (err) {
    manageAllErrors(res, err)
  }
})

module.exports = router