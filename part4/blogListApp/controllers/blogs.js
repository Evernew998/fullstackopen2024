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

blogRouter.post('/', async (request, response) => {
  const body = request.body
  const blog = new Blog(body)

  const returnedBlog = await blog.save()
  logger.info("returnedBlog", returnedBlog)
  response.status(201).json(returnedBlog)
})

module.exports = blogRouter