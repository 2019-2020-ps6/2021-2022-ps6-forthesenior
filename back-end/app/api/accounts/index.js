const {Router} = require('express')
const {Account} = require('../../models')
const {UsersRouter} = require('./users')
const manageAllErrors = require('../../utils/routes/error-management')

const router = new Router()

console.log(UsersRouter)
// router.use('/:accountId/users', UsersRouter)

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
    Account.delete(req.params.accountId)
    res.status(204).end()
  } catch (err) {
    manageAllErrors(res, err)
  }
})

module.exports = router
