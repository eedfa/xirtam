const express = require('express')
const graphqlHttp = require('express-graphql')
const rootSchema = require('./schemas/rootSchema.js')
const mongoose = require('mongoose')
const cors = require('cors')
const { errorTypes } = require('./constants.js')
const app = express()

app.use(cors())
const resolveErrorCode = (errorMessage) => {
  console.log(errorMessage)
  return errorTypes[errorMessage]
}
mongoose.connect('mongodb://a:aaaaaa1@ds125352.mlab.com:25352/wefewfwqasasf', { uri_decode_auth: true })
mongoose.connection.once('open', () => {
  console.log('connected')
})

app.use('/graphql', graphqlHttp(request => ({ schema: rootSchema,
  context: { request: request },
  graphiql: true,
  formatError: (err) => {
    const errorMessage = err.message
    try {
      const error = resolveErrorCode(errorMessage)
      return ({ message: error.message, statusCode: error.statusCode })
    } catch (err) {
      return errorMessage
    }
  } })))

app.listen(4000, () => {
  console.log('UP!!!')
})
