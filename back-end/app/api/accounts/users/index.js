const {Router} = require('express')
const manageAllErrors = require("../../../utils/routes/error-management");
const {
  CreateUserForAccount,
  FilterUserFromAccount,
  GetUserFromAccount,
  UpdateUserFromAccount,
  DeleteUserFromAccount
} = require('./userManager')

const router = new Router({mergeParams: true})


router.get('/', (req, res) => {
  try {
    res.status(200).json(FilterUserFromAccount(req.params.accountId))
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.get('/:userId', (req, res) => {
  try {
    res.status(200).json(GetUserFromAccount(req.params.accountId, req.params.userId))
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.post('/', (req, res) => {
  try {
    res.status(201).json(CreateUserForAccount(req.params.accountId, req.body))
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.put('/:userId', (req, res) => {
  try {
    res.status(200).json(UpdateUserFromAccount(req.params.accountId, req.params.userId, req.body))
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.delete('/:userId', (req, res) => {
  try {
    res.status(200).json(DeleteUserFromAccount(req.params.accountId, req.params.userId))
  } catch (err) {
    manageAllErrors(res, err)
  }
})

module.exports = router
