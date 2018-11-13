const graphql = require('graphql')
const { GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList } = graphql
const BoardMongoSchema = require('../mongoDBSchema/boardSchema.js')
const topicSchema = require('../mongoDBSchema/topicSchema.js')
const { topicType } = require('./topicSchema.js')
const { checkLoggedIn } = require('../checkToken.js')

const boardType = new GraphQLObjectType({
  name: 'boardType',
  fields: () => ({
    id: ({ type: GraphQLString }),
    boardName: ({ type: GraphQLString }),
    boardScore: ({ type: GraphQLInt }),
    boardCreatorId: ({ type: GraphQLString }),
    topic: ({
      type: GraphQLList(topicType),
      async resolve (parent, args) {
        let query = topicSchema.find({ boardId: parent.id })
        query.select('originPost topicId topicName topicContent topicTimeStamp topicBoardName topicType')
        let result = await query.exec()
        return result
      }
    }),
    ratingScore: ({ type: GraphQLInt }),
    ratingAmount: ({ type: GraphQLInt })
  })
})

const boards = {
  type: GraphQLList(boardType),
  args: {
    id: { type: GraphQLString },
    boardId: ({ type: GraphQLString }),
    boardName: ({ type: GraphQLString }),
    boardScore: ({ type: GraphQLInt }),
    boardCreator: ({ type: GraphQLString }) },
  async resolve (parent, args, context) {
    if (args.boardName !== '' && args.boardName !== undefined) {
      let result = await BoardMongoSchema.find({ boardName: args.boardName })
      return result
    } else if (args.boardId !== '' && args.boardId !== undefined) {
      let result = await BoardMongoSchema.findById(args.boardId)
      return [result]
    } else {
      let result = await BoardMongoSchema.find({})
      return result
    }
  }
}

const boardAdd = {
  type: boardType,
  args: {
    boardName: ({ type: GraphQLString })
  },
  async resolve (parents, args, context) {
    let userId = await checkLoggedIn(context)
    const schema = new BoardMongoSchema({
      boardName: args.boardName,
      boardScore: 0,
      boardCreatorId: userId
    })
    return schema.save()
  }
}

const boardAddRating = {
  type: boardType,
  args: {
    boardId: ({ type: GraphQLString }),
    boardName: ({ type: GraphQLString }),
    rating: ({ type: GraphQLInt })
  },
  resolve (parents, args, context) {
    let userId = checkLoggedIn(context)
    if (args.boardName !== '' && args.boardName !== undefined) {
      let updateQuery = BoardMongoSchema.findOneAndUpdate(
        { boardName: args.boardName },
        { $inc: {
          ratingScore: args.rating,
          ratingAmount: 1 }
        }
      )
      updateQuery.exec()
    } else {
      let updateQuery = BoardMongoSchema.findOneAndUpdate(
        { _id: args.boardId },
        { $inc: {
          ratingScore: args.rating,
          ratingAmount: 1 }
        }
      )
      updateQuery.exec()
    }
    return null
  }
}

const boardSearch = {
  type: GraphQLList(boardType),
  args: { searchQuery: ({ type: GraphQLString }) },
  async resolve (parents, args, context) {
    const searchRegex = RegExp('.*' + args.searchQuery + '.*', 'gim')
    const searchQuery = BoardMongoSchema.find({ boardName: searchRegex })
    const searchResult = await searchQuery.exec()
    return searchResult
  }
}

module.exports = { boards, boardAdd, boardType, boardAddRating, boardSearch }
