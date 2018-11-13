const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TopicSchema = new Schema({
  topicName: String,
  topicContent: String,
  topicAuthor: String,
  originPost: String,
  topicTimeStamp: String,
  boardId: String,
  ratingScore: Number,
  ratingAmount: Number,
  topicPic: String

})

module.exports = mongoose.model('topic', TopicSchema)
