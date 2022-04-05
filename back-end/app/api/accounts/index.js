const {Router} = require('express')
const {Account} = require('../../models')
const UserRouter = require('./users')
const manageAllErrors = require('../../utils/routes/error-management')
const {DeleteAccount} = require("./accountManager");


const router = new Router()

router.use('/:accountId/users', UserRouter)

router.get('/', (req, res) => {
  try {
    res.status(200).json(Account.get())
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.get('/:accountId', (req, res) => {
  try {
    res.status(200).json(Account.getById(req.params.accountId))
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.post('/', (req, res) => {
  try {
    // TODO Separate Sub Json objects
    const user = Account.create({...req.body})
    res.status(201).json(user)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.put('/:accountId', (req, res) => {
  try {
    res.status(200).json(Account.update(req.params.accountId, req.body))
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.delete('/:accountId', (req, res) => {
  try {
    res.status(204).json(DeleteAccount(req.params.accountId))
  } catch (err) {
    manageAllErrors(res, err)
  }
})

module.exports = router
