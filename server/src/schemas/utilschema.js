const graphql = require('graphql')
const { topicType } = require('./topicSchema.js')
const boardSchema = require('../mongoDBSchema/boardSchema.js')
const { boardType } = require('./boardSchema.js')
const topicSchema = require('../mongoDBSchema/topicSchema.js')
const { GraphQLString, GraphQLList } = graphql

const seacrhTopicQuery = {

  type: GraphQLList(topicType),
  args: {
    query: GraphQLString
  },
  async reslove (parents, args) {
    try {
      const searchQuery = topicSchema.find({ topicName: args.query })
      searchQuery.query(`id topicName topicContent topicTimeStamp
    topicType boardId`)
      const searchResult = await searchQuery.exec()
      return searchResult
    } catch (error) {
      return { 'internal error:': error }
    }
  }
}

const seacrhBoardQuery = {

  type: GraphQLList(boardType),
  args: {
    query: GraphQLString
  },
  async reslove (parents, args) {
    try {
      const searchQuery = boardSchema.find({ boardName: args.query })
      searchQuery.query(`id topicName topicContent topicTimeStamp
    topicType boardId`)
      const searchResult = await searchQuery.exec()
      return searchResult
    } catch (error) {
      return { 'internal error:': error }
    }
  }
}

module.exports = { seacrhTopicQuery, seacrhBoardQuery }
