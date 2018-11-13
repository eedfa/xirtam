const bcrypt = require('bcrypt')
const { jwtSecret } = require('../utils/constants')
const jsonwebtoken = require('jsonwebtoken')
const UserDBSchema = require('../mongoDBSchema/UserSchema.js')

const loginQuery = async (username, password) => {
  try {
    const username = username
    const userQuery = await UserDBSchema.findOne({ 'name': username })
    userQuery.select('name passwordHash email')

    const user = await userQuery.exec()

    const valid = bcrypt.compare(password, user.passwordHash)
    if (!valid) {
      throw new Error('Incorrect password')
    }
    const token = jsonwebtoken.sign({
      id: user._id,
      username: user.name
    }, jwtSecret, { expiresIn: '1y' })
    return { token: token, username: user.name, email: user.email }
  } catch (error) {
    return { 'internal error:': error }
  }
}
const addUserMutaiton = async (username, passwordHash, email) => {
  const user = new UserDBSchema({
    name: username,
    passwordHash: passwordHash,
    email: email })
  return user.save()
}
module.exports = { loginQuery, addUserMutaiton }
