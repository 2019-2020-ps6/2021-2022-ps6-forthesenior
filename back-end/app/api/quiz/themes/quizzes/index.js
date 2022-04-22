const {Router} = require('express')
const QuestionRouter = require('./questions')
const manageAllErrors = require("../../../../utils/routes/error-management");
const {
  CreateQuizForTheme,
  FilterQuizFromTheme,
  GetQuizFromTheme,
  UpdateQuizFromTheme,
  DeleteQuizFromTheme
} = require("./quizManager");

const router = new Router({mergeParams: true})

router.use('/:quizId/questions', QuestionRouter)

router.get('/', (req, res) => {
  try {
    res.status(200).json(FilterQuizFromTheme(req.params.themeId))
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.get('/:quizId', (req, res) => {
  try {
    res.status(200).json(GetQuizFromTheme(req.params.themeId, req.params.quizId))
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.post('/', (req, res) => {
  try {
    res.status(201).json(CreateQuizForTheme(req.params.themeId, req.body))
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.put('/:quizId', (req, res) => {
  try {
    res.status(200).json(UpdateQuizFromTheme(req.params.themeId, req.params.quizId, req.body))
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.delete('/:quizId', (req, res) => {
  try {
    res.status(200).json(DeleteQuizFromTheme(req.params.themeId, req.params.quizId))
  } catch (err) {
    manageAllErrors(res, err)
  }
})

module.exports = router
