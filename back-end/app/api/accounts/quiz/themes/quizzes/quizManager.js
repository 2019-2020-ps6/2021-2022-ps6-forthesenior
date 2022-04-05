const {Quiz} = require('../../../../../models')
const {StringToNumber} = require('../../../../../utils/Funcions')

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
  return Quiz.get().filter((Quiz) => Quiz.themeId === themeId)
}

/**
 * Gets a Quiz from a Theme
 *
 * @param themeId id of the Theme
 * @param QuizId id of the Quiz
 * @returns {*}
 * @constructor
 */
const GetQuizFromTheme = (themeId, QuizId) => {
  if (typeof QuizId === 'string') QuizId = StringToNumber(QuizId)
  let quiz = FilterQuizFromTheme(themeId).find(Quiz => Quiz === Quiz.getById(QuizId))
  if (quiz === undefined) {
    quiz = "Error Quiz Not Found: 404"
  }
  return quiz
}

/**
 * Updates a Quiz for a Theme
 *
 * @param themeId id of the Theme
 * @param QuizId id of the Quiz
 * @param body Json of the updated Quiz
 * @returns {*}
 * @constructor
 */
const UpdateQuizFromTheme = (themeId, QuizId, body) => {
  const quiz = GetQuizFromTheme(themeId, QuizId)
  if (typeof quiz !== 'string') {
    Quiz.update(QuizId, body)
  }
  return quiz
}

/**
 * Deletes a Quiz from a Theme
 *
 * @param themeId id of the Theme
 * @param QuizId id of the Quiz
 * @constructor
 */
const DeleteQuizFromTheme = (themeId, QuizId) => {
  const quiz = GetQuizFromTheme(themeId, QuizId)
  if (typeof quiz !== 'string') {
    Quiz.delete(QuizId)
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