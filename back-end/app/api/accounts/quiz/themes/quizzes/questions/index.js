const {Router} = require('express')
const AnswerRouter = require('./answers')
const manageAllErrors = require("../../../../../../utils/routes/error-management");
const {
  CreateQuestionForQuiz,
  FilterQuestionFromQuiz,
  GetQuestionFromQuiz,
  UpdateQuestionFromQuiz,
  DeleteQuestionFromQuiz
} = require("./questionManager");

const router = new Router({mergeParams: true})

router.use('/:questionId/answer', AnswerRouter)

router.get('/', (req, res) => {
  try {
    res.status(200).json(FilterQuestionFromQuiz(req.params.quizId))
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.get('/:questionId', (req, res) => {
  try {
    res.status(200).json(GetQuestionFromQuiz(req.params.quizId, req.params.questionId))
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.post('/', (req, res) => {
  try {
    res.status(201).json(CreateQuestionForQuiz(req.params.quizId, req.body))
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.put('/:questionId', (req, res) => {
  try {
    res.status(200).json(UpdateQuestionFromQuiz(req.params.quizId, req.params.questionId, req.body))
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.delete('/:questionId', (req, res) => {
  try {
    res.status(200).json(DeleteQuestionFromQuiz(req.params.quizId, req.params.questionId))
  } catch (err) {
    manageAllErrors(res, err)
  }
})

module.exports = router