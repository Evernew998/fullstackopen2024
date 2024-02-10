const blogRouter = require('express').Router()
const logger = require('../utils/logger')
const Blog = require('../models/blog')

blogRouter.get('/', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      logger.info('blogs =', blogs)
      response.json(blogs)
    })
})

blogRouter.post('/', (request, response) => {
  const body = request.body

  const blog = new Blog(body)
  blog
    .save()
    .then(returnedBlog => {
      logger.info('returnedBlog =', returnedBlog)
      response.status(201).json(returnedBlog)
    })
})

module.exports = blogRouter