const userRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')

userRouter.get('/', async (request, response, next) => {
  try {
    const users = await User
      .find({})
      .populate('blogs', { title: 1, author: 1, url: 1, likes: 1 })
    response.json(users)
  }
  catch(exeption) {
    next(exeption)
  }
})

userRouter.post('/', async (request, response, next) => {
  const { username, password, name } = request.body

  if (password === undefined || password.length < 3) {
    return response.status(400).json({
      error: 'password must be at least 3 characters long'
    })
  }

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