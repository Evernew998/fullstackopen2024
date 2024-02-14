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

blogRouter.delete('/:id', async (request, response, next) => {
  const id =  request.params.id
  try {
    console.log('try id =', id)
    console.log('at try typeof id =', typeof id)
    await Blog.findByIdAndDelete(id)
    response.status(204).end()
  }
  catch (exception) {
    console.log('catch id =', id)
    next(exception)
  }
})

blogRouter.put('/:id', async (request, response, next) => {
  const id = request.params.id
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }
  console.log('updating blog')
  try {
    console.log('at try: updating blog')
    const updatedBlog = await Blog.findByIdAndUpdate(id, blog, { new: true })
    response.json(updatedBlog)
  }
  catch (execption) {
    next(execption)
  }
})

module.exports = blogRouter