const {Router} = require('express')
const {Account} = require('../../models')
const UserRouter = require('./users')
const ThemeRouter = require('./quiz/themes')
const manageAllErrors = require('../../utils/routes/error-management')
const {GetAccount, DeleteAccount} = require("./accountManager");


const router = new Router({mergeParams: true})

router.use('/:accountId/users', UserRouter)
router.use('/:accountId/themes', ThemeRouter)

router.get('/', (req, res) => {
  try {
    res.status(200).json(Account.get())
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.get('/:accountId', (req, res) => {
  try {
    res.status(200).json(GetAccount(req.params.accountId))
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

router.post('/login', (req, res) => {
  try {
    const account = Account.get().find(account => account.email === req.body.email && account.password === req.body.password);
    account === undefined ? res.status(400).end() : res.status(200).json(account)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

module.exports = router
