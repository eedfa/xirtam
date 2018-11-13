
const { PubSub, withFilter } = require('graphql-subscriptions')
const { topics,
  loadTopicPosts,
  loadTopicsBoardcast,
  addTopicMutation
  , addTopicPost } = require('../models/TopicModels.js')

const pubsub = new PubSub()
const TopicResolvers = {
  Query: {
    async topics (root, args, context, info) {
      return topics(args.boardName, args.boardId)
    },
    async loadTopicPosts (root, args, context, info) {
      return loadTopicPosts(args.topicId)
    }
  },
  Subscription: {
    loadTopicPostsBoardcast: {
      subscribe: withFilter(
        () => pubsub.asyncIterator('loadTopicPostsBoardcast'),
        (payload, variables) => {
          return payload.loadTopicPostsBoardcast.originPost === variables.topicId
        }
      )
    },
    loadTopicsBoardcast: {
      subscribe: withFilter(
        () => pubsub.asyncIterator('loadTopicsBoardcast'),
        async (payload, variables) => {
          return loadTopicsBoardcast(payload, variables.boardId, variables.boardName)
        }
      )
    }

  },
  Mutation: {

    async addTopicMutation (root, args, context) {
      return addTopicMutation(args.files, args.boardName, context, args.topicName,
        args.topicContent, args.boardId, pubsub)
    },
    async addTopicPost (root, args, context, info) {
      return addTopicPost(args.files, args.topicMainId, context, args.topicName,
        args.topicContent, args.topicMainName, pubsub)
    }
  }
}

module.exports = TopicResolvers
