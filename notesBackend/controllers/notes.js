const notesRouter = require('express').Router()
const Note = require('../models/note')
const User = require('../models/user')
const logger = require('../utils/logger')
const jwt = require('jsonwebtoken')

const getTokenFrom = (request) => {
  const authorization = request.get('authorization')
  if(authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}

notesRouter.get('/', async (request, response, next) => {
  try {
    const notes = await Note
      .find({}).populate('user', { username: 1, name: 1 })
    response.json(notes)
  }
  catch (exception) {
    next(exception)
  }
})

notesRouter.get('/:id', async (request, response, next) => {
  try {
    const note = await Note.findById(request.params.id)
    if (note) {
      response.json(note)
    } else {
      response.status(404).end()
    }
  } catch(exception) {
    next(exception)
  }
})

notesRouter.post('/', async (request, response, next) => {
  const body = request.body

  console.log('body', body)

  try {
    const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)

    console.log('decodedToken: ', decodedToken)
    if (!decodedToken.id) {
      return response.status(401).json({
        error: 'invalid token'
      })
    }

    const user = await User.findById(decodedToken.id)

    const note = new Note({
      content: body.content,
      important: body.important === undefined ? false : body.important,
      user: user.id
    })

    logger.info('typeof user.id is', typeof user.id)

    const savedNote = await note.save()

    logger.info('typeof savedNot.id is', typeof savedNote.id)

    user.notes = user.notes.concat(savedNote._id)
    await user.save()

    response.status(201).json(savedNote)
  }
  catch(exception) {
    next(exception)
  }
})

notesRouter.delete('/:id', async (request, response, next) => {
  try {
    await Note.findByIdAndDelete(request.params.id)
    response.status(204).end()
  } catch(exception) {
    next(exception)
  }
})

notesRouter.put('/:id', (request, response, next) => {
  const body = request.body

  const note = {
    content: body.content,
    important: body.important,
  }

  Note.findByIdAndUpdate(request.params.id, note, { new: true })
    .then(updatedNote => {
      response.json(updatedNote)
    })
    .catch(error => next(error))
})

module.exports = notesRouter