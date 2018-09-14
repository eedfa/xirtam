const mongoose = require('mongoose')
const Schema = mongoose.Schema

const topicSchema = new Schema({
  topicName: String,
  topicContent: String,
  topicAuthor: Number,
  topicTimeStamp: String,
  topicId: String,
  topicBoardName: String,
  __id: String

})

module.exports = mongoose.model('topic', topicSchema)
