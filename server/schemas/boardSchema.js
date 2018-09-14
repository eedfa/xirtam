const graphql = require('graphql')
const { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList } = graphql
const boardMongoSchema = require('../mongoDBSchema/boardSchema.js')
const { UserType } = require('./userSchema.js')
const { checkLoggedIn } = require('../checkToken.js')

const boardSchema = new GraphQLObjectType({
  name: 'boardSchema',
  fields: () => ({
    boardId: ({ type: GraphQLString }),
    boardName: ({ type: GraphQLString }),
    boardScore: ({ type: GraphQLInt }),
    boardCreator: ({ type: UserType,
      resolve (parents, args) {
        return UserType.findById(parents.authorId)
      }

    })
  })
})

const boards = {
  type: GraphQLList(boardSchema),
  args: {
    id: { type: GraphQLString },
    boardId: ({ type: GraphQLString }),
    boardName: ({ type: GraphQLString }),
    boardScore: ({ type: GraphQLInt }),
    boardCreator: ({ type: GraphQLString }) },
  async resolve (parent, args, context) {
    var result = await boardMongoSchema.find({})
    console.log(result)
    return result
  }
}

const boardAdd = {
  type: boardSchema,
  args: {
    boardName: ({ type: GraphQLString })
  },
  resolve (parents, args, context) {
    var userId = checkLoggedIn(context)
    console.log('context')
    console.log(userId)
    const schema = new boardMongoSchema({
      boardName: args.boardName,
      boardScore: 0,
      boardCreatorId: userId
    })
    return schema.save()
  }

}

module.exports = { boards, boardAdd }
