const BoardMongoSchema = require('../mongoDBSchema/BoardMongoSchema.js')
const TopicSchema = require('../mongoDBSchema/TopicSchema.js')
const seacrhQuery = async (query) => {
  try {
    let boardResults = await BoardMongoSchema.find({ 'boardName': { $regex: String(query), $options: 'i' } })
    const topicResultsName = await TopicSchema.find({ 'topicName': { $regex: String(query), $options: 'i' } })
    const topicResultsContent = await TopicSchema.find({ 'topicContent': { $regex: String(query), $options: 'i' } })

    boardResults = boardResults.concat(topicResultsName)
    boardResults = boardResults.concat(topicResultsContent)
    return boardResults
  } catch (error) {
    return { 'internal error:': error }
  }
}

module.exports = { seacrhQuery }
