const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  id: String,
  name: String,
  email: String,
  passwordHash: String
})

module.exports = mongoose.model('user', UserSchema)
