const graphql = require('graphql')
const { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList } = graphql
const topicSchema = require('../mongoDBSchema/topicSchema.js')
const topicType = new GraphQLObjectType({
  'name': 'topic',
  fields: () => ({
    id: { type: GraphQLString },
    topicId: { type: GraphQLInt },
    topicName: { type: GraphQLString },
    topicContent: { type: GraphQLString },
    topicTimeStamp: { type: GraphQLString },
    topicBoardName: { type: GraphQLString }
  })
})

const addTopicMutation = {
  type: topicType,
  args: {
    topicName: { type: GraphQLString },
    topicContent: { type: GraphQLString },
    topicTimeStamp: { type: GraphQLString },
    topicBoardName: { type: GraphQLString }
  },
  resolve (parent, args) {
    let topic = new topicSchema({
      topicName: args.topicName,
      topicContent: args.topicContent,
      topicTimeStamp: +new Date(),
      topicBoardName: args.topicBoardName
    })
    return topic.save()
  } }

const loadTopicMutation = {
  type: GraphQLList(topicType),
  args: {
    topicBoardName: { type: GraphQLString }

  },
  async resolve (parent, args) {
    let topicQuery = topicSchema.find({ topicBoardName: args.topicBoardName })
    topicQuery.select('topicName topicContent id')
    let result = await topicQuery.exec()
    return result
  }

}
const addTopicPost = {
  type: topicType,
  args: {
    topicName: { type: GraphQLString },
    topicContent: { type: GraphQLString },
    topicMainId: { type: GraphQLString }
  },
  async resolve (parent, args) {
    let topicOriginNameQuery = topicSchema.findById(args.topicMainId)
    topicOriginNameQuery.select('topicBoardName')
    let topicOriginName = await topicOriginNameQuery.exec()
    topicOriginName = topicOriginName.topicBoardName
    let topicPost = new topicSchema({
      topicName: args.topicName,
      topicContent: args.topicContent,
      topicTimeStamp: +new Date(),
      topicBoardName: topicOriginName
    })

    topicPost.save()
  }

}

module.exports = { addTopicMutation, loadTopicMutation, addTopicPost }
