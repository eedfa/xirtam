const graphql = require('graphql')
const { GraphQLObjectType, GraphQLSchema } = graphql
const { addUserMutaiton, loginMutation ,UserType } = require('./userSchema.js')
const { boards, boardAdd } = require('./boardSchema.js')
const { GraphQLUpload } =  require('apollo-upload-server')
const { topics,loadTopicMutation, addTopicMutation , addTopicPost,loadTopicPosts } = require('./topicSchema.js')


const rootQuery = new GraphQLObjectType({
  name: 'rootQuery',
  fields: { boards ,topics,loadTopicPosts} })

const rootMutations = new GraphQLObjectType({
  name: 'rootMutations',
  fields: {
    addUserMutaiton, loginMutation, boardAdd, loadTopicMutation, addTopicMutation, addTopicPost
  } })
module.exports = new GraphQLSchema({ 
  query: rootQuery,
  mutation: rootMutations

})
