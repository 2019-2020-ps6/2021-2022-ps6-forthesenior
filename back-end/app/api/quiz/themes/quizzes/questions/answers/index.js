const {Router} = require('express')
const manageAllErrors = require("../../../../../../utils/routes/error-management");
const {
  CreateAnswerForQuestion,
  FilterAnswerFromQuestion,
  GetAnswerFromQuestion,
  UpdateAnswerFromQuestion,
  DeleteAnswerFromQuestion
} = require("./answerManager");

const router = new Router({mergeParams: true})

router.get('/', (req, res) => {
  try {
    res.status(200).json(FilterAnswerFromQuestion(req.params.questionId))
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.get('/:answerId', (req, res) => {
  try {
    res.status(200).json(GetAnswerFromQuestion(req.params.questionId, req.params.answerId))
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.post('/', (req, res) => {
  try {
    res.status(201).json(CreateAnswerForQuestion(req.params.questionId, req.body))
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.put('/:answerId', (req, res) => {
  try {
    res.status(200).json(UpdateAnswerFromQuestion(req.params.questionId, req.params.answerId, req.body))
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.delete('/:answerId', (req, res) => {
  try {
    res.status(200).json(DeleteAnswerFromQuestion(req.params.questionId, req.params.answerId))
  } catch (err) {
    manageAllErrors(res, err)
  }
})

module.exports = router
