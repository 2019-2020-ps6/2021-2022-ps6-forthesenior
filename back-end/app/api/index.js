const {Router} = require('express')
const AccountRouter = require('./accounts')
const ThemeRouter = require('./quiz/themes')
const OptionRouter = require('./options')

const router = new Router()

router.use('/accounts', AccountRouter)
router.use('/theme', ThemeRouter)
router.use('/option', OptionRouter)

module.exports = router
