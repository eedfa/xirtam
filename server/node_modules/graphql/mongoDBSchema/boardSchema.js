const mongoose = require('mongoose')
const Schema = mongoose.Schema

const boardSchema = new Schema({
  boardId: String,
  boardName: String,
  boardScore: Number,
  boardCreatorId: String

})

module.exports = mongoose.model('board', boardSchema)
