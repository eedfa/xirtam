const graphql = require('graphql')
const { GraphQLObjectType, GraphQLSchema } = graphql
const { addUserMutaiton, loginMutation } = require('./userSchema.js')
const { boards,
  boardAdd,
  boardAddRating,
  boardSearch } = require('./boardSchema.js')
const { topics,
  loadTopicMutation,
  addTopicMutation,
  addTopicPost,
  loadTopicPosts,
  loadTopicPostsBoardcast } = require('./topicSchema.js')

const rootQuery = new GraphQLObjectType({
  name: 'rootQuery',
  fields: { boards, topics, loadTopicPosts } })

const rootMutations = new GraphQLObjectType({
  name: 'rootMutations',
  fields: {
    addUserMutaiton,
    loginMutation,
    loadTopicPostsBoardcast,
    boardAdd,
    loadTopicMutation,
    addTopicMutation,
    addTopicPost,
    boardAddRating,
    boardSearch
  } })
module.exports = new GraphQLSchema({
  query: rootQuery,
  mutation: rootMutations
})
