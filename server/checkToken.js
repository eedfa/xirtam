const { errorNames, jwtSecret } = require('./constants')
const jwt = require('jsonwebtoken')
function checkLoggedIn (req, context) {
  var token = req.request.headers['x-access-token']
  if (!token) {
    try {
      throw new Error(errorNames.NOTOKEN)
    } catch (err) {
      throw err.message
    }
  }
  try {
    jwt.verify(token, jwtSecret)
    var decoded = jwt.decode(token)
  } catch (err) {
    throw err.message
  }

  return decoded.id
}
module.exports = { checkLoggedIn }
