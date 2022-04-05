const {Router} = require('express')
const AccountRouter = require('./accounts')

const router = new Router()

router.use('/accounts', AccountRouter)

module.exports = router
