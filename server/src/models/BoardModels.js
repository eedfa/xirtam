const { checkLoggedIn } = require('../utils/checkToken.js')
const BoardMongoSchema = require('../mongoDBSchema/BoardMongoSchema.js')
const loadBoards = async (boardName, boardId) => {
  try {
    if (boardName !== '' && boardName !== undefined && boardName !== null) {
      const result = await BoardMongoSchema.find({ boardName: boardName })
      return result
    }
    if (boardId !== '' && boardId !== undefined && boardId !== null) {
      const result = await BoardMongoSchema.findById(boardId)
      return [result]
    }
    const result = await BoardMongoSchema.find({})
    return result
  } catch (error) {
    return { 'internal error:': error }
  }
}
const ratingBoardcast = async (payload, boardName, boardId) => {
  if (boardId === undefined) {
    const boardNameQuery = await BoardMongoSchema.find({ boardName: boardName })
    boardNameQuery.select('id')
    try {
      const boardId = await boardNameQuery.exec()
    } catch (error) {
      return { 'internal error:': error }
    }
    boardId = boardId[0].id
  }
  return payload.ratingBoardcast.boardId === boardId
}
const boardAdd = async (boardName, context, pubsub) => {
  try {
    const userId = await checkLoggedIn(context)
  } catch (error) {
    return { 'internal error:': error }
  }
  const newBoard = {
    boardName: boardName,
    boardScore: 0,
    boardCreatorId: userId
  }
  const schema = new BoardMongoSchema(newBoard)
  pubsub.publish('loadBoardsBoardcast', { loadBoardsBoardcast: newBoard })
  return schema.save()
}
const boardAddRating = async (boardName, boardId, rating, context) => {
  try {
    const userId = await checkLoggedIn(context)
  } catch (error) {
    return { 'internal error:': error }
  }
  if (boardName !== '' && boardName !== undefined) {
    const updateQuery = await BoardMongoSchema.findOneAndUpdate(
      { boardName: boardName },
      { $inc: {
        ratingScore: rating,
        ratingAmount: 1 }
      }
    )
    updateQuery.exec()
  } else {
    const updateQuery = await BoardMongoSchema.findOneAndUpdate(
      { _id: boardId },
      { $inc: {
        ratingScore: rating,
        ratingAmount: 1 }
      }
    )
    updateQuery.exec()
  }
  return null
}
module.exports = { loadBoards, ratingBoardcast, boardAdd, boardAddRating }
