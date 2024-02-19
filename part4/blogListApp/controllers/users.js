const userRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')

userRouter.get('/', async (request, response, next) => {
  try {
    const users = await User.find({})
    response.json(users)
  }
  catch(exeption) {
    next(exeption)
  }
})

userRouter.post('/', async (request, response, next) => {
  const { username, password, name } = request.body
  const saltRounds = 10

  try {
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
      username: username,
      passwordHash: passwordHash,
      name: name
    })

    const savedUser = await user.save()
    response.status(201).json(savedUser)
  }
  catch(exeption) {
    next(exeption)
  }
})

module.exports = userRouter