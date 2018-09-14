const graphql = require('graphql')
const { GraphQLObjectType, GraphQLSchema } = graphql
const { boards, boardAdd } = require('./boardSchema.js')
const { loadTopicMutation, addTopicMutation , addTopicPost } = require('./topicSchema.js')
const { addUserMutaiton, loginMutation } = require('./userSchema.js')

const rootQuery = new GraphQLObjectType({

  name: 'rootQuery',
  fields: { boards } })

const Mutation = new GraphQLObjectType({

  name: 'Mutation',
  fields: {
    addUserMutaiton, loginMutation, boardAdd, loadTopicMutation, addTopicMutation, addTopicPost
  } })
module.exports = new GraphQLSchema({
  query: rootQuery,
  mutation: Mutation

})
