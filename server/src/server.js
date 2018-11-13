const express = require('express')
const http = require('http')
const mongoose = require('mongoose')
const cors = require('cors')
const { ApolloServer, makeExecutableSchema } = require('apollo-server-express')
const boardResolvers = require('./resolvers/BoardResolvers.js')
const topicResolvers = require('./resolvers/TopicResolvers.js')
const userResolvers = require('./resolvers/userResolvers.js')
const utilsResolvers = require('./resolvers/utilsResolvers.js')
const { importSchema } = require('graphql-import')
const typeDefs = importSchema('./typeDefs/rootTypeDefs.graphql')
const app = express()
const { PubSub } = require('graphql-subscriptions')
require('dotenv').config()

const pubsub = new PubSub()
const fs = require('fs')
app.use(cors())
app.get('/uploads/*', function (req, res) {
  try {
    const path = require('path')
    const mime = require('mime')
    const file = './uploads/' + req.url.substring(9)
    if (fs.existsSync(file) && req.url.substring(9).length > 0) {
      const filename = path.basename(file)
      const mimetype = mime.lookup(file)
      res.setHeader('Content-disposition', 'attachment; filename=' + filename)
      res.setHeader('Content-type', mimetype)
      const filestream = fs.createReadStream(file)
      filestream.pipe(res)
    }
  } catch (error) {
  }
})
const resolverss = [topicResolvers, boardResolvers, utilsResolvers, userResolvers]
const schema = makeExecutableSchema({ typeDefs: typeDefs, resolvers: resolverss })
mongoose.connect(process.env.mongooseUrl, { uri_decode_auth: true })
mongoose.connection.once('open', () => {})
const graphqlServer = new ApolloServer({ schema,
  path: process.env.graphqlPath,
  Subscriptions: {
    loadTopicPostsBoardcast: {
      subscribe: () => {
        pubsub.asyncIterator('loadTopicPostsBoardcast')
      }
    }
  },
  context: ({ req, res }) => (
    req
  ) })

graphqlServer.applyMiddleware({ app })
const httpServer = http.createServer(app)
graphqlServer.installSubscriptionHandlers(httpServer)

httpServer.listen(process.env.PORT, () => {
  console.log('UP!!!' + graphqlServer.graphqlPath)
  console.log(`🚀 Subscriptions ready at ws://localhost:4000${graphqlServer.subscriptionsPath}`)
})
