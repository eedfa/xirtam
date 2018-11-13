const graphql = require('graphql')
const UserDBSchema = require('../mongoDBSchema/userSchema.js')
const { GraphQLObjectType,
  GraphQLInt,
  GraphQLString } = graphql
const bcrypt = require('bcrypt')
const { jwtSecret } = require('../constants')
const { boardType } = require('./boardSchema')
const jsonwebtoken = require('jsonwebtoken')
const boardSchema = require('../mongoDBSchema/boardSchema.js')

const UserType = new GraphQLObjectType({
  name: 'login',
  fields: () => ({
    id: { type: GraphQLInt },
    username: { type: GraphQLString },
    password: { type: GraphQLString },
    token: { type: GraphQLString },
    boards: ({
      type: boardType,
      resolve (parent, args) {
        return boardSchema.find({ 'boardCreatorId': parent.id })
      }

    })
  })
})

const addUserMutaiton = {
  type: UserType,
  args: {
    username: { type: GraphQLString },
    passwordHash: { type: GraphQLString },
    email: { type: GraphQLString }
  },
  resolve (parent, args) {
    const user = new UserDBSchema({
      name: args.username,
      passwordHash: args.passwordHash,
      email: args.email })

    return user.save()
  }
}

const loginMutation = {
  type: String,
  args: {
    username: { type: GraphQLString },
    password: { type: GraphQLString }
  },
  async resolve (parent, args, context) {
    const username = args.username
    const userQuery = UserDBSchema.findOne({ 'name': username })
    userQuery.select('name passwordHash')
    const user = await userQuery.exec()
    const valid = bcrypt.compare(args.password, user.passwordHash)
    if (!valid) {
      throw new Error('Incorrect password')
    }
    const token = jsonwebtoken.sign({
      id: user._id,
      username: user.name
    }, jwtSecret, { expiresIn: '1y' })
    return { token: token }
  }
}

module.exports = { UserType, addUserMutaiton, loginMutation }
