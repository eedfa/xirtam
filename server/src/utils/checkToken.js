const { errorNames, jwtSecret } = require('./constants')
const jwt = require('jsonwebtoken')
const { OAuth2Client } = require('google-auth-library')
require('dotenv').config()

async function checkLoggedIn (req) {
  if (req.headers['x-access-token-google'] !== '' && req.headers['x-access-token-google'] !== undefined) {
    const client = new OAuth2Client(process.env.OAuth2Auidince)
    const ticket = await client.verifyIdToken({
      idToken: req.headers['x-access-token-google'],
      audience: process.env.OAuth2Auidince
    }
    )
    const payload = await ticket.getPayload()
    const userid = await payload['sub']
    return userid
  } else {
    const token = req.headers['x-access-token']
    let decoded
    if (!token) {
      try {
        throw new Error(errorNames.NOTOKEN)
      } catch (err) {
        throw err.message
      }
    }
    try {
      jwt.verify(token, jwtSecret)
      decoded = jwt.decode(token)
    } catch (err) {
      throw err.message
    }
    return decoded.id
  }
}
module.exports = { checkLoggedIn }
