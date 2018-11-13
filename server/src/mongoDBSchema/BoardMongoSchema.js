const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BoardMongoSchema = new Schema({
  boardId: String,
  boardName: String,
  boardScore: Number,
  boardCreatorId: String,
  ratingScore: Number,
  ratingAmount: Number,
  boardPic: String
})

module.exports = mongoose.model('board', BoardMongoSchema)
