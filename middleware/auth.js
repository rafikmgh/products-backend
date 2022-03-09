const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = function (req, res, next) {
  // get the token (i used split to get just the token from the header Authorization)

  const token = req.header('Authorization').split(' ')[1]

  // test if there is a token

  if (!token) return res.status(401).json({ message: 'Invalid token' })

  try {
    //decoding
    const decoded = jwt.verify(token, config.get('jwtSecret'))

    req.user = decoded.user

    next()
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' })
  }
}
