const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

usersRouter.get('/', async (request, response, next) => {
  try {
    const usersInDb = await User
      .find({}).populate('notes', { content: 1, important: 1 })
    response.json(usersInDb)
  }
  catch(exception) {
    next(exception)
  }
})

usersRouter.post('/', async (request, response, next) => {
  const { username, name, password } = request.body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username: username,
    name: name,
    passwordHash: passwordHash,
  })

  try {
    const savedUser = await user.save()
    response.status(201).json(savedUser)
  }
  catch(exception) {
    next(exception)
  }
})

module.exports = usersRouter