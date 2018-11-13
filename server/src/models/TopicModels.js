const fs = require('fs')
const TopicSchema = require('../mongoDBSchema/TopicSchema.js')
const { checkLoggedIn } = require('../utils/checkToken.js')
const boardSchema = require('../mongoDBSchema/BoardMongoSchema.js')
const storeFS = ({ stream, filename }) => {
  const path = `uploads/${filename}`
  return new Promise((resolve, reject) =>
    stream
      .on('error', error => {
        if (stream.truncated) {
          fs.unlinkSync(path)
        }
        reject(error)
      })
      .pipe(fs.createWriteStream(path))
      .on('error', error => reject(error))
      .on('finish', () => resolve({ path }))
  )
}

const topics = async (boardName, boardId) => {
  try {
    if (boardName === undefined && boardId === undefined) {
      return []
    }
    if (boardId === undefined) {
      const boardNameQuery = await boardSchema.find({ boardName: boardName })
      boardNameQuery.select('id')

      const boardId = await boardNameQuery.exec()

      boardId = boardId[0].id
    }

    const query = await TopicSchema.find({ 'boardId': boardId })
    query.select('originPost id topicName topicContent topicTimeStamp topicBoardName topicType boardId topicPic')

    const result = await query.exec()

    return result
  } catch (error) {
    return { 'internal error:': error }
  }
}

const loadTopicPosts = async (topicId) => {
  try {
    const topicQuery = await TopicSchema.find({ 'originPost': topicId })
    topicQuery.select('topicName topicContent topicTimeStamp topicPic')

    const result = await topicQuery.exec()

    if (!Array.isArray(result)) {
      return [result]
    }
    return result
  } catch (error) {
    return { 'internal error:': error }
  }
}
const loadTopicsBoardcast = async (payload, boardId, boardName) => {
  try {
    if (boardId === undefined) {
      const boardNameQuery = await boardSchema.find({ boardName: boardName })
      boardNameQuery.select('id')

      const boardId = await boardNameQuery.exec()

      boardId = boardId[0].id
    }
    return payload.loadTopicsBoardcast.boardId === boardId
  } catch (error) {
    return { 'internal error:': error }
  }
}
const addTopicMutation = async (file, boardName, context, topicName, topicContent, boardId, pubsub) => {
  try {
    const filename = ''
    if (file !== undefined) {
      const { stream, filename } = await file

      filename = filename.replace(new RegExp(' ', 'g'), '')
      storeFS({ stream, filename })
    }
    if (boardId === undefined) {
      const boardNameQuery = await boardSchema.find({ boardName: boardName })
      boardNameQuery.select('id')

      const boardId = await boardNameQuery.exec()

      boardId = boardId[0].id
    }
    const userId = await checkLoggedIn(context)

    const newTopic = {
      topicName: topicName,
      topicContent: topicContent,
      topicTimeStamp: +new Date(),
      topicAuthor: userId,
      boardId: boardId,
      originPost: '',
      topicPic: filename
    }
    const topic = new TopicSchema(newTopic)
    pubsub.publish('loadTopicsBoardcast', { loadTopicsBoardcast: newTopic })
    return topic.save()
  } catch (error) {
    return { 'internal error:': error }
  }
}
const addTopicPost = async (file, topicMainId, context, topicName, topicContent, topicMainName, pubsub) => {
  try {
    const filename = ''
    if (file !== undefined) {
      const { stream, filename } = await file

      filename = filename.replace(new RegExp(' ', 'g'), '')

      await storeFS({ stream, filename })
    }
    if (topicMainId === undefined) {
      topicMainId = topicMainName
    }
    const topicOriginNameQuery = await TopicSchema.findById(topicMainId)
    topicOriginNameQuery.select('topicBoardName')

    let topicOriginName = await topicOriginNameQuery.exec()

    topicOriginName = topicOriginName.topicBoardName
    const postObject = { topicName: topicName,
      topicContent: topicContent,
      topicTimeStamp: +new Date(),
      topicBoardName: topicOriginName,
      originPost: topicMainId,
      topicPic: filename }
    const topicPost = new TopicSchema(postObject)
    pubsub.publish('loadTopicPostsBoardcast', { loadTopicPostsBoardcast: postObject })
    topicPost.save()
  } catch (error) {
    return { 'internal error:': error }
  }
}
module.exports = { topics, loadTopicPosts, loadTopicsBoardcast, addTopicMutation, addTopicPost }
