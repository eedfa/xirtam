
exports.errorNames = {
  NOTOKEN: 'No token',
  WRONGTOKEN: 'Wong token'

}

exports.errorTypes = {
  NOTOKEN: {
    message: 'No token',
    statusCode: 401
  },
  WRONGTOKEN: {
    message: 'Wrong Token',
    statusCode: 401
  }

}

exports.jwtSecret = 'j<89hH#OIJ(*2jopk)(jPK)(JKOPj9'
