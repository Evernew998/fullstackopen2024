const loginRouter = require('express').Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

loginRouter.post('/', async (request, response, next) => {
  const { username, password } = request.body

  try {
    const user = await User.findOne({ username })
    const passwordCorrect = user === null ?
      false
      : await bcrypt.compare(password, user.passwordHash)

    if (!(username && passwordCorrect)) {
      return response.status(401).json({
        error: 'Invalid username or password'
      })
    }

    const userForToken = {
      username: user.username,
      id: user.id
    }

    const token = jwt.sign(
      userForToken,
      process.env.SECRET,
      { expiresIn: 60 * 60 }
    )

    console.log('typeof token is ', typeof token)

    response
      .status(200)
      .send({ token, username: user.username, name: user.name })
  }
  catch(exception) {
    next(exception)
  }
})

module.exports = loginRouter