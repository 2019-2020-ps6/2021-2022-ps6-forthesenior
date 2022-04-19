const { Router } = require('express')

const { Option } = require('../../models')
const manageAllErrors = require('../../utils/routes/error-management')

const router = new Router()

router.get('/', (req, res) => {
  try {
    res.status(200).json(Option.get())
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.get('/:userId', (req, res) => {
  try {
    res.status(200).json(Option.getOptionId(req.params.userId))
  } catch (err) {
    manageAllErrors(res, err)
  }
})

module.exports = router
