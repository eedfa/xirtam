const graphql = require('graphql')
const { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList } = graphql
const boardMongoSchema = require('../mongoDBSchema/boardSchema.js')
const topicSchema = require('../mongoDBSchema/topicSchema.js')
const {topicType} =  require('./topicSchema.js')

const { checkLoggedIn } = require('../checkToken.js')

const boardType = new GraphQLObjectType({
  name: 'boardType',
  fields: () => ({
    id: ({ type: GraphQLString }),
    boardName: ({ type: GraphQLString }),
    boardScore: ({ type: GraphQLInt }),
    boardCreatorId:({type: GraphQLString}),
    topic:({
      type:GraphQLList(topicType),
      async resolve (parent, args){
        var query = topicSchema.find({boardId:parent.id})
        query.select('originPost topicId topicName topicContent topicTimeStamp topicBoardName topicType')
        var result = await query.exec()
        return result
      }
    })
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
      var result = await boardMongoSchema.find({})
      return result
  }
}

const boardAdd = {
  type: boardType,
  args: {
    boardName: ({ type: GraphQLString })
  },
  resolve (parents, args, context) {
    var userId = checkLoggedIn(context)
    const schema = new boardMongoSchema({
      boardName: args.boardName,
      boardScore: 0,
      boardCreatorId: userId
    })
    return schema.save()
  }

}
module.exports = { boards, boardAdd ,boardType }
