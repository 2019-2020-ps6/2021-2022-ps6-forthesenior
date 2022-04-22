const {Question} = require('../../../../../models')
const {StringToNumber} = require('../../../../../utils/Funcions')
const {FilterAnswerFromQuestion, DeleteAnswerFromQuestion} = require("./answers/answerManager");

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
  return Question.get().filter(question => question.quizId === quizId)
}

/**
 * Gets a Question from a Quiz
 *
 * @param quizId id of the Quiz
 * @param questionId id of the Question
 * @returns {*}
 * @constructor
 */
const GetQuestionFromQuiz = (quizId, questionId) => {
  if (typeof questionId === 'string') questionId = StringToNumber(questionId)
  let question = FilterQuestionFromQuiz(quizId).find(question => question === Question.getById(questionId))
  if (question === undefined) {
    question = "Error Question Not Found: 404"
  } else {
    question = {...question, answers: FilterAnswerFromQuestion(questionId)}
  }
  return question
}

/**
 * Updates a Question for a Quiz
 *
 * @param quizId id of the Quiz
 * @param questionId id of the Question
 * @param body Json of the updated Question
 * @returns {*}
 * @constructor
 */
const UpdateQuestionFromQuiz = (quizId, questionId, body) => {
  const question = GetQuestionFromQuiz(quizId, questionId)
  if (typeof question !== 'string') {
    Question.update(questionId, body)
  }
  return question
}

/**
 * Deletes a Question from a Quiz
 *
 * @param quizId id of the Quiz
 * @param questionId id of the Question
 * @constructor
 */
const DeleteQuestionFromQuiz = (quizId, questionId) => {
  const question = GetQuestionFromQuiz(quizId, questionId)
  if (typeof question !== 'string') {
    FilterAnswerFromQuestion(questionId).forEach(answer => DeleteAnswerFromQuestion(questionId, answer.id))
    Question.delete(questionId)
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
