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
  return Answer.get().filter((Answer) => Answer.questionId === questionId)
}

/**
 * Gets an Answer from a Question
 *
 * @param questionId id of the Question
 * @param AnswerId id of the Answer
 * @returns {*}
 * @constructor
 */
const GetAnswerFromQuestion = (questionId, AnswerId) => {
  if (typeof AnswerId === 'string') AnswerId = StringToNumber(AnswerId)
  let answer = FilterAnswerFromQuestion(questionId).find(Answer => Answer === Answer.getById(AnswerId))
  if (answer === undefined) {
    answer = "Error Answer Not Found: 404"
  }
  return answer
}

/**
 * Updates an Answer for a Question
 *
 * @param questionId id of the Question
 * @param AnswerId id of the Answer
 * @param body Json of the updated Answer
 * @returns {*}
 * @constructor
 */
const UpdateAnswerFromQuestion = (questionId, AnswerId, body) => {
  const answer = GetAnswerFromQuestion(questionId, AnswerId)
  if (typeof answer !== 'string') {
    Answer.update(AnswerId, body)
  }
  return answer
}

/**
 * Deletes an Answer from a Question
 *
 * @param questionId id of the Question
 * @param AnswerId id of the Answer
 * @constructor
 */
const DeleteAnswerFromQuestion = (questionId, AnswerId) => {
  const answer = GetAnswerFromQuestion(questionId, AnswerId)
  if (typeof answer !== 'string') {
    Answer.delete(AnswerId)
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