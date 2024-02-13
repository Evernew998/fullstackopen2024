const blogRouter = require('express').Router()
const logger = require('../utils/logger')
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  try {
    logger.info('blogs =', blogs)
    response.json(blogs)
  }
  catch (execption){
    next(execption)
  }
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