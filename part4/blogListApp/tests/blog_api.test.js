const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

describe('when there is initially some blogs saved', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('blogs have an id property', async () => {
    const response = await api.get('/api/blogs')
    for (let blog of response.body) {
      expect(blog.id).toBeDefined()
    }
  })
})

describe('addition of a new blog', () => {
  test('making an HTTP POST request creates a new blog post', async () => {
    const newBlog = {
      title: 'Type wars',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
      likes: 2,
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogs = await helper.blogsInDb()
    const blogTitles = blogs.map(blog => blog.title)

    expect(blogs).toHaveLength(helper.initialBlogs.length + 1)
    expect(blogTitles).toContain(
      'Type wars'
    )
  })

  test('if the likes property is missing from the request, it will default to 0', async () => {
    const newBlog = {
      title: 'Type wars',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html'
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogs = await helper.blogsInDb()
    const returnedBlog = blogs[blogs.length - 1]

    expect(returnedBlog.likes).toBe(0)
  })

  test('backend responds with the status code 400 Bad Request if the title is missing from request' , async () => {
    const newBlog = {
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
      likes: 5
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  })

  test('backend responds with the status code 400 Bad Request if the url is missing from request' , async () => {
    const newBlog = {
      title: 'Type wars',
      author: 'Robert C. Martin',
      likes: 5
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  })
})

describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsBefore = await helper.blogsInDb()
    const blogToDelete = blogsBefore[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAfter = await helper.blogsInDb()
    expect(blogsAfter).toHaveLength(helper.initialBlogs.length - 1)

    const blogTitles = blogsAfter.map(blog => blog.title)
    expect(blogTitles).not.toContain(blogToDelete.title)
  })

  test('fails with status code 400 if id is invalid', async () => {
    //const invalidId = '65cce31d508a76c8dc38570f'
    const invalidId = '1234567890'
    console.log('test invalidId =', invalidId)
    console.log('test typeof invalidId =', typeof invalidId)
    await api
      .delete(`/api/blogs/${invalidId}`)
      .expect(400)
  })

  test('succeeds with status code 204 when deleting a non-existing blog', async () => {
    const nonExistingId = await helper.nonExistingId()
    await api
      .delete(`/api/blogs/${nonExistingId}`)
      .expect(204)
  })
})

describe('updating a blog', () => {
  test('succeeds with status code 200 when blog exists', async () => {
    const oldBlogs = await helper.blogsInDb()
    const id = oldBlogs[0].id
    const updatedBlog = {
      title: 'updatedTitle',
      author: oldBlogs[0].author,
      url: oldBlogs[0].url,
      likes: 15
    }

    await api
      .put(`/api/blogs/${id}`)
      .send(updatedBlog)
      .expect(200)

    const updatedBlogs = await helper.blogsInDb()
    const returnedBlog = updatedBlogs[0]

    updatedBlog.id = id

    console.log('id =', id)
    console.log('old blog =', oldBlogs[0])
    console.log('updated blog =', updatedBlog)
    console.log('returned bLog =', returnedBlog)

    expect(returnedBlog).not.toEqual(oldBlogs[0])
    expect(returnedBlog).toEqual(updatedBlog)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})