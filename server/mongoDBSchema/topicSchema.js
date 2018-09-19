const mongoose = require('mongoose')
const Schema = mongoose.Schema

const topicSchema = new Schema({
  topicName: String,
  topicContent: String,
  topicAuthor: String,
  originPost: String,
  topicTimeStamp: String,
  boardId: String

})

module.exports = mongoose.model('topic', topicSchema)
