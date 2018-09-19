const promisesAll=  require( 'promises-all')
const mkdirp  =require( 'mkdirp')
const shortid = require( 'shortid')
const lowdb = require( 'lowdb')
const FileSync = require( 'lowdb/adapters/FileSync')
const graphql = require('graphql')
const { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList ,GraphQLInputObjectType ,GraphQLNonNull } = graphql
const topicSchema = require('../mongoDBSchema/topicSchema.js')
const boardSchema = require('../mongoDBSchema/boardSchema.js')
const { checkLoggedIn } = require('../checkToken.js')
const {boardType} = require('./boardSchema.js')

const topicType = new GraphQLObjectType({
  name: 'topic',
  fields:{
    originPost :{type: GraphQLString},
    id: { type: GraphQLString },
    topicName: { type: GraphQLString },
    topicContent: { type: GraphQLString },
    topicTimeStamp: { type: GraphQLString },
    topicBoardName: { type: GraphQLString },
    topicType:{type:GraphQLInt},
    boardId: { type: GraphQLString }
  }
})

const loadTopicPosts = {
  type: GraphQLList(topicType),
  args: { 
    topicId:{type:GraphQLString}
  },
  async resolve(parent,args){
    let topicQuery = topicSchema.find({'originPost':args.topicId})
    topicQuery.select('topicName topicContent topicTimeStamp')
    let result = await topicQuery.exec()
    if(!Array.isArray(result)){
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
  
    if (args.boardName === undefined && args.boardId === undefined){
      return []
    }
    if (args.boardId === undefined){
      var boardNameQuery = boardSchema.find({boardName:args.boardName})
      boardNameQuery.select('id')
      var boardId = await boardNameQuery.exec()
      args.boardId =  boardId[0].id
    }
    var query =  topicSchema.find({'boardId':args.boardId})
    query.select('originPost id topicName topicContent topicTimeStamp topicBoardName topicType boardId')
    var result = await query.exec()
    return result
  }
}

const addTopicMutation = {
  type: topicType,
  args: {
    topicName: { type: GraphQLString },
    topicContent: { type: GraphQLString },
    boardId: { type: GraphQLString },
    topicType:{ type: GraphQLInt }
  },
  resolve (parent, args, context) {
    var userId = checkLoggedIn(context)
    let topic = new topicSchema({
      topicName: args.topicName,
      topicContent: args.topicContent,
      topicTimeStamp: +new Date(),
      topicAuthor: userId,
      boardId: args.boardId,
      originPost:''
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
const createTopicMutation = {
  type: topicType,
  args: {
    topicName: { type: GraphQLString },
    topicContent: { type: GraphQLString },
    topicMainId: { type: GraphQLString },
    topicType:{ type: GraphQLInt }
  
  },
  async resolve (parent, args,context) {
    var userId = checkLoggedIn(context)
    let topicOriginNameQuery = topicSchema.findById(args.topicMainId)
    topicOriginNameQuery.select('topicBoardName')
    let topicOriginName = await topicOriginNameQuery.exec()
    topicOriginName = topicOriginName.topicBoardName
    var buf = new Buffer(args.file, 'base64'); 
    fs.writeFile("/tmp/test",buf, function(err) {
      if(err) {
        return null
      }
  }); 
    let topicPost = new topicSchema({
      topicName: args.topicName,
      topicContent: args.topicContent,
      topicTimeStamp: +new Date(),
      topicBoardName: topicOriginName,
      originPost:args.topicMainId,
      file: args.file
    })

    topicPost.save()
  }

}
const addTopicPost = {
  type: topicType,
  args: {
    topicName: { type: GraphQLString },
    topicContent: { type: GraphQLString },
    topicMainId: { type: GraphQLString },
    topicType:{ type: GraphQLInt }
  
  },
  async resolve (parent, args,context) {
    var userId = checkLoggedIn(context)
    let topicOriginNameQuery = topicSchema.findById(args.topicMainId)
    topicOriginNameQuery.select('topicBoardName')
    let topicOriginName = await topicOriginNameQuery.exec()
    topicOriginName = topicOriginName.topicBoardName
    let topicPost = new topicSchema({
      topicName: args.topicName,
      topicContent: args.topicContent,
      topicTimeStamp: +new Date(),
      topicBoardName: topicOriginName,
      originPost:args.topicMainId,
      file: args.file
    })

    topicPost.save()
  }

}
module.exports = { topics, topicType,addTopicMutation, loadTopicMutation, addTopicPost ,loadTopicPosts }
