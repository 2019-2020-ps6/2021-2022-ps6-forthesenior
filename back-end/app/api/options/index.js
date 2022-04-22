const { Router } = require('express')

const { Options } = require('../../models')
const manageAllErrors = require('../../utils/routes/error-management')

const router = new Router()

router.get('/', (req, res) => {
    try {
        res.status(200).json(Options.get())
    } catch (err) {
        manageAllErrors(res, err)
    }
})

router.get('/:userId', (req, res) => {
    try {
        res.status(200).json(Options.getOptionId(req.params.userId))
    } catch (err) {
        manageAllErrors(res, err)
    }
})

module.exports = router
