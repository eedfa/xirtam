
const { loginQuery, addUserMutaiton } = require('../models/UserModels.js')

const UserResolvers = {

  Mutation: {
    async loginQuery (root, args, context, info) {
      return loginQuery(args.username, args.password)
    },
    async addUserMutaiton (root, args, context, info) {
      return addUserMutaiton(args.username, args.passwordHash, args.email)
    }
  }

}

module.exports = UserResolvers
