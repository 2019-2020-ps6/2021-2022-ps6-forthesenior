const {Answer} = require('../../../../../../../models')
const {StringToNumber} = require('../../../../../../../utils/Funcions')

/**
 * Creates an Answer for a Question
 *
 * @param questionId id of Question
 * @param body json of new Answer
 * @returns {{id: number}}
 * @constructor
 */
const CreateAnswerForQuestion = (questionId, body) => {
  if (typeof questionId === 'string') questionId = StringToNumber(questionId)
  return Answer.create({...body, questionId: questionId})
}

/**
 * List of Answer from a Question
 * @param questionId id of the Question
 * @constructor
 */
const FilterAnswerFromQuestion = (questionId) => {
  if (typeof questionId === 'string') questionId = StringToNumber(questionId)
  return Answer.get().filter(answer => answer.questionId === questionId)
}

/**
 * Gets an Answer from a Question
 *
 * @param questionId id of the Question
 * @param answerId id of the Answer
 * @returns {*}
 * @constructor
 */
const GetAnswerFromQuestion = (questionId, answerId) => {
  if (typeof answerId === 'string') answerId = StringToNumber(answerId)
  let answer = FilterAnswerFromQuestion(questionId).find(answer => answer === Answer.getById(answerId))
  if (answer === undefined) {
    answer = "Error Answer Not Found: 404"
  }
  return answer
}

/**
 * Updates an Answer for a Question
 *
 * @param questionId id of the Question
 * @param answerId id of the Answer
 * @param body Json of the updated Answer
 * @returns {*}
 * @constructor
 */
const UpdateAnswerFromQuestion = (questionId, answerId, body) => {
  const answer = GetAnswerFromQuestion(questionId, answerId)
  if (typeof answer !== 'string') {
    Answer.update(answerId, body)
  }
  return answer
}

/**
 * Deletes an Answer from a Question
 *
 * @param questionId id of the Question
 * @param answerId id of the Answer
 * @constructor
 */
const DeleteAnswerFromQuestion = (questionId, answerId) => {
  const answer = GetAnswerFromQuestion(questionId, answerId)
  if (typeof answer !== 'string') {
    Answer.delete(answerId)
  }
  return answer
}

module.exports = {
  CreateAnswerForQuestion,
  FilterAnswerFromQuestion,
  GetAnswerFromQuestion,
  UpdateAnswerFromQuestion,
  DeleteAnswerFromQuestion
}