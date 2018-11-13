const boardMongoSchema = require('../mongoDBSchema/BoardMongoSchema.js')
const topicSchemaMongoSchema = require('../mongoDBSchema/TopicSchema.js')
const UtilsResolvers = {
  searchResult: {
    __resolveType (obj, context, info) {
      if (obj.boardName) {
        return 'Board'
      }

      if (obj.topicContent) {
        return 'Topic'
      }
      return null
    }
  },
  Query: {
    async seacrhQuery (root, args, context, info) {

    }
  }
}

module.exports = UtilsResolvers
