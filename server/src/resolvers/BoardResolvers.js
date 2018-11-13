const { loadBoards,
  ratingBoardcast,
  boardAdd,
  boardAddRating } = require('../models/BoardModels.js')
const { PubSub, withFilter } = require('graphql-subscriptions')
const pubsub = new PubSub()
const BoardResolvers = {
  Query: {
    async boards (root, args) {
      return loadBoards(args.boardName, args.boardId)
    }
  },
  Subscription: {
    loadBoardsBoardcast: {
      subscribe: () => {
        return pubsub.asyncIterator('loadBoardsBoardcast')
      }
    },
    ratingBoardcast: {
      subscribe: withFilter(
        () => pubsub.asyncIterator('ratingBoardcast'),
        async (payload, variables) => {
          return ratingBoardcast(payload, variables.boardId, variables.boardName)
        }
      )
    }
  },
  Mutation: {
    async boardAdd (root, args, context) {
      return boardAdd(args.boardName, context, pubsub)
    },
    async boardAddRating (root, args, context) {
      return boardAddRating(args.boardName, args.boardId, args.rating, context)
    }
  }
}

module.exports = BoardResolvers
