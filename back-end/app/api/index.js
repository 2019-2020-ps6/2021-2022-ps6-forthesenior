const { Router } = require('express')
const QuizzesRouter = require('./quizzes')
const UserRouter = require('./users')
const ThemeRouter = require('./themes')
const OptionRouter = require('./options')

const router = new Router()
router.get('/status', (req, res) => res.status(200).json('ok'))
router.use('/quizzes', QuizzesRouter)
router.use('/users', UserRouter)
router.use('/theme-list', ThemeRouter)
router.use('/option', OptionRouter)

module.exports = router
