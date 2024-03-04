const jwt = require('jsonwebtoken')
const loginRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')

loginRouter.post('/', async (request, response, next) => {
  const { username, password } = request.body

  try {
    const user = await User.findOne({ username: username })
    const passwordCorrect = user === null ? false : await bcrypt.compare(password, user.passwordHash)

    if (!(user && passwordCorrect)) {
      return response.status(401).json({
        error: 'invalid username or password'
      })
    }

    const userForToken = {
      username: user.username,
      id: user._id
    }

    const token = jwt.sign(
      userForToken,
      process.env.SECRET,
      { expiresIn: 60*5 }
    )

    response
      .status(200)
      .send({ token: token, username: user.username, name: user.name })
  }
  catch(execption) {
    next(execption)
  }
})

module.exports = loginRouter