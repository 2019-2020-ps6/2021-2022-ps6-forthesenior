const {Router} = require("express");
const manageAllErrors = require("../../../../utils/routes/error-management");
const {
  FilterOptionFromUser, GetOptionFromUser, CreateOptionForUser, UpdateOptionFromUser, DeleteOptionFromUser
} = require("./optionManager");


const router = new Router({mergeParams: true})

router.get('/', (req, res) => {
  try {
    res.status(200).json(FilterOptionFromUser(req.params.userId))
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.get('/:optionId', (req, res) => {
  try {
    res.status(200).json(GetOptionFromUser(req.params.userId, req.params.optionId))
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.post('/', (req, res) => {
  try {
    res.status(201).json(CreateOptionForUser(req.params.userId, req.body))
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.put('/:optionId', (req, res) => {
  try {
    res.status(200).json(UpdateOptionFromUser(req.params.userId, req.params.optionId, req.body))
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.delete('/:optionId', (req, res) => {
  try {
    res.status(200).json(DeleteOptionFromUser(req.params.userId, req.params.optionId))
  } catch (err) {
    manageAllErrors(res, err)
  }
})

module.exports = router