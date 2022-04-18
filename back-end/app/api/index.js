const {Router} = require('express')
const AccountRouter = require('./accounts')
const UsersRouter = require('./accounts/users')
const ThemeRouter = require('./accounts/quiz/themes')

const router = new Router()

router.use('/accounts', AccountRouter)
router.use('/theme', ThemeRouter)

module.exports = router
