const {Router} = require('express')
const AccountRouter = require('./accounts')

const router = new Router()
router.get('/status', (req, res) => res.status(200).json('ok'))
router.use('/accounts', AccountRouter)

module.exports = router
