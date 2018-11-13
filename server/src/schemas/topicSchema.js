const graphql = require('graphql')
const { GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList } = graphql
const TopicSchema = require('../mongoDBSchema/topicSchema.js')
const boardSchema = require('../mongoDBSchema/boardSchema.js')
const { checkLoggedIn } = require('../checkToken.js')
const { GraphQLUpload } = require('apollo-upload-server')

const topicType = new GraphQLObjectType({
  name: 'topic',
  fields: {
    originPost: { type: GraphQLString },
    id: { type: GraphQLString },
    topicName: { type: GraphQLString },
    topicContent: { type: GraphQLString },
    topicTimeStamp: { type: GraphQLString },
    topicBoardName: { type: GraphQLString },
    topicType: { type: GraphQLInt },
    boardId: { type: GraphQLString },
    ratingScore: ({ type: GraphQLInt }),
    ratingAmount: ({ type: GraphQLInt })
  }
})

const loadTopicPosts = {
  type: GraphQLList(topicType),
  args: {
    topicId: { type: GraphQLString }
  },
  async resolve (parent, args) {
    const topicQuery = TopicSchema.find({ 'originPost': args.topicId })
    topicQuery.select('topicName topicContent topicTimeStamp')
    const result = await topicQuery.exec()
    if (!Array.isArray(result)) {
      return [result]
    }
    return result
  }
}

const topics = {
  type: GraphQLList(topicType),
  args: {
    boardId: ({ type: GraphQLString }),
    boardName: ({ type: GraphQLString }) },
  async resolve (parent, args) {
    if (args.boardName === undefined && args.boardId === undefined) {
      return []
    }
    if (args.boardId === undefined) {
      const boardNameQuery = boardSchema.find({ boardName: args.boardName })
      boardNameQuery.select('id')
      const boardId = await boardNameQuery.exec()
      args.boardId = boardId[0].id
    }
    const query = TopicSchema.find({ 'boardId': args.boardId })
    query.select('originPost id topicName topicContent topicTimeStamp topicBoardName topicType boardId')
    const result = await query.exec()
    return result
  }
}

const addTopicMutation = {
  type: topicType,
  args: {
    topicName: { type: GraphQLString },
    topicContent: { type: GraphQLString },
    boardId: { type: GraphQLString },
    topicType: { type: GraphQLInt }
  },
  async resolve (parent, args, context) {
    const userId = await checkLoggedIn(context)
    const topic = new TopicSchema({
      topicName: args.topicName,
      topicContent: args.topicContent,
      topicTimeStamp: +new Date(),
      topicAuthor: userId,
      boardId: args.boardId,
      originPost: ''
    })
    return topic.save()
  } }

const loadTopicMutation = {
  type: GraphQLList(topicType),
  args: {
    topicBoardName: { type: GraphQLString }
  },
  async resolve (parent, args) {
    const topicQuery = TopicSchema.find({ topicBoardName: args.topicBoardName })
    topicQuery.select('topicName topicContent id')
    const result = await topicQuery.exec()
    return result
  }

}
const addTopicPost = {
  type: topicType,
  args: {
    topicName: { type: GraphQLString },
    topicContent: { type: GraphQLString },
    topicMainId: { type: GraphQLString },
    topicType: { type: GraphQLInt },
    files: { type: GraphQLUpload }

  },
  async resolve (parent, args, context) {
    const userId = checkLoggedIn(context)
    const topicOriginNameQuery = TopicSchema.findById(args.topicMainId)
    topicOriginNameQuery.select('topicBoardName')
    let topicOriginName = await topicOriginNameQuery.exec()
    topicOriginName = topicOriginName.topicBoardName
    const topicPost = new TopicSchema({
      topicName: args.topicName,
      topicContent: args.topicContent,
      topicTimeStamp: +new Date(),
      topicBoardName: topicOriginName,
      originPost: args.topicMainId,
      file: args.file
    })

    topicPost.save()
  }

}
module.exports = { topics, topicType, addTopicMutation, loadTopicMutation, addTopicPost, loadTopicPosts }
