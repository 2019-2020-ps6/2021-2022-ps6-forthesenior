const {Question} = require('../../../../../../models')
const {StringToNumber} = require('../../../../../../utils/Funcions')

/**
 * Creates a Question for a Quiz
 *
 * @param quizId id of Quiz
 * @param body json of new Question
 * @returns {{id: number}}
 * @constructor
 */
const CreateQuestionForQuiz = (quizId, body) => {
  if (typeof quizId === 'string') quizId = StringToNumber(quizId)
  return Question.create({...body, quizId: quizId})
}

/**
 * List of Question from a Quiz
 * @param quizId id of the Quiz
 * @constructor
 */
const FilterQuestionFromQuiz = (quizId) => {
  if (typeof quizId === 'string') quizId = StringToNumber(quizId)
  return Question.get().filter((Question) => Question.quizId === quizId)
}

/**
 * Gets a Question from a Quiz
 *
 * @param quizId id of the Quiz
 * @param QuestionId id of the Question
 * @returns {*}
 * @constructor
 */
const GetQuestionFromQuiz = (quizId, QuestionId) => {
  if (typeof QuestionId === 'string') QuestionId = StringToNumber(QuestionId)
  let question = FilterQuestionFromQuiz(quizId).find(Question => Question === Question.getById(QuestionId))
  if (question === undefined) {
    question = "Error Question Not Found: 404"
  }
  return question
}

/**
 * Updates a Question for a Quiz
 *
 * @param quizId id of the Quiz
 * @param QuestionId id of the Question
 * @param body Json of the updated Question
 * @returns {*}
 * @constructor
 */
const UpdateQuestionFromQuiz = (quizId, QuestionId, body) => {
  const question = GetQuestionFromQuiz(quizId, QuestionId)
  if (typeof question !== 'string') {
    Question.update(QuestionId, body)
  }
  return question
}

/**
 * Deletes a Question from a Quiz
 *
 * @param quizId id of the Quiz
 * @param QuestionId id of the Question
 * @constructor
 */
const DeleteQuestionFromQuiz = (quizId, QuestionId) => {
  const question = GetQuestionFromQuiz(quizId, QuestionId)
  if (typeof question !== 'string') {
    Question.delete(QuestionId)
  }
  return question
}

module.exports = {
  CreateQuestionForQuiz,
  FilterQuestionFromQuiz,
  GetQuestionFromQuiz,
  UpdateQuestionFromQuiz,
  DeleteQuestionFromQuiz
}