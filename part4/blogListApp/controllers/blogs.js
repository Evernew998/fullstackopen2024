const blogRouter = require('express').Router()
const logger = require('../utils/logger')
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog.find({})
    logger.info('blogs =', blogs)
    response.json(blogs)
  }
  catch (execption){
    next(execption)
  }
})

blogRouter.post('/', async (request, response, next) => {
  const body = request.body
  const blog = new Blog(body)

  try {
    const returnedBlog = await blog.save()
    logger.info('returnedBlog', returnedBlog)
    response.status(201).json(returnedBlog)
  }
  catch (execption) {
    next(execption)
  }
})

module.exports = blogRouter