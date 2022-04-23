const {Quiz} = require('../../../../models')
const {StringToNumber} = require('../../../../utils/Funcions')
const {FilterQuestionFromQuiz, DeleteQuestionFromQuiz} = require("./questions/questionManager");
const {FilterAnswerFromQuestion} = require("./questions/answers/answerManager");

/**
 * Creates a Quiz for a Theme
 *
 * @param themeId id of Theme
 * @param body json of new Quiz
 * @returns {{id: number}}
 * @constructor
 */
const CreateQuizForTheme = (themeId, body) => {
  if (typeof themeId === 'string') themeId = StringToNumber(themeId)
  return Quiz.create({...body, themeId: themeId})
}

/**
 * List of Quiz from a Theme
 * @param themeId id of the Theme
 * @constructor
 */
const FilterQuizFromTheme = (themeId) => {
  if (typeof themeId === 'string') themeId = StringToNumber(themeId)
  console.log(themeId);
  return Quiz.get().filter(quiz => quiz.themeId === themeId)
}

/**
 * Gets a Quiz from a Theme
 *
 * @param themeId id of the Theme
 * @param quizId id of the Quiz
 * @returns {*}
 * @constructor
 */
const GetQuizFromTheme = (themeId, quizId) => {
  if (typeof quizId === 'string') quizId = StringToNumber(quizId)
  let quiz = FilterQuizFromTheme(themeId).find(quiz => quiz === Quiz.getById(quizId))
  if (quiz === undefined) {
    quiz = "Error Quiz Not Found: 404"
  } else {
    const questionsList = FilterQuestionFromQuiz(quizId)
    questionsList.forEach(question => question.answers = FilterAnswerFromQuestion(question.id))
    quiz = {...quiz, questions: questionsList}
  }
  return quiz
}

/**
 * Updates a Quiz for a Theme
 *
 * @param themeId id of the Theme
 * @param quizId id of the Quiz
 * @param body Json of the updated Quiz
 * @returns {*}
 * @constructor
 */
const UpdateQuizFromTheme = (themeId, quizId, body) => {
  const quiz = GetQuizFromTheme(themeId, quizId)
  if (typeof quiz !== 'string') {
    Quiz.update(quizId, body)
  }
  return quiz
}

/**
 * Deletes a Quiz from a Theme
 *
 * @param themeId id of the Theme
 * @param quizId id of the Quiz
 * @constructor
 */
const DeleteQuizFromTheme = (themeId, quizId) => {
  const quiz = GetQuizFromTheme(themeId, quizId)
  if (typeof quiz !== 'string') {
    FilterQuestionFromQuiz(quizId).forEach(question => DeleteQuestionFromQuiz(quizId, question.id))
    Quiz.delete(quizId)
  }
  return quiz
}

module.exports = {
  CreateQuizForTheme,
  FilterQuizFromTheme,
  GetQuizFromTheme,
  UpdateQuizFromTheme,
  DeleteQuizFromTheme
}
