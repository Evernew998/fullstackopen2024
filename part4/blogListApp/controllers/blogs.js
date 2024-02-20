const blogRouter = require('express').Router()
const logger = require('../utils/logger')
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')

blogRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog
      .find({})
      .populate('user',{ username: 1, name: 1 })

    logger.info('blogs =', blogs)
    response.json(blogs)
  }
  catch (execption){
    next(execption)
  }
})

blogRouter.post('/', async (request, response, next) => {
  const body = request.body

  try {
    const token = request.token
    const decodedToken = jwt.verify(token, process.env.SECRET)

    if (!decodedToken.id) {
      return response.status(401).json({
        error: 'invalid token'
      })
    }
    const user = await User.findById(decodedToken.id)

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user._id
    })

    const returnedBlog = await blog.save()
    logger.info('returnedBlog', returnedBlog)

    user.blogs = user.blogs.concat(returnedBlog._id)
    await user.save()

    response.status(201).json(returnedBlog)
  }
  catch (execption) {
    next(execption)
  }
})

blogRouter.delete('/:id', async (request, response, next) => {
  const blogId =  request.params.id

  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    if (!decodedToken.id) {
      return response.status(401).json({
        error: 'invalid token'
      })
    }

    const user = await User.findById(decodedToken.id)
    const blog = await Blog.findById(blogId)

    if (!user) {
      return response.status(400).json({
        error: 'invalid user'
      })
    }

    if (!blog) {
      return response.status(400).json({
        error: 'invalid blog id'
      })
    }

    if (blog.user.toString() !== user._id.toString()) {
      return response.status(401).json({
        error: 'user is unauthorized to delete blog'
      })
    }

    await Blog.findByIdAndDelete(blog._id)
    user.blogs = user.blogs.filter(b => b.toString() !== blog._id.toString())

    await user.save()
    response.status(204).end()
  }
  catch (exception) {
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

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(id, blog, { new: true })
    response.json(updatedBlog)
  }
  catch (execption) {
    next(execption)
  }
})

module.exports = blogRouter