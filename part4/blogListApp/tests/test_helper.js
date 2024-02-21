const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt =  require('bcrypt')

const initialBlogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
  },
  {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 10,
  }
]

const user = {
  username: 'Laici998',
  password: 'Kyubi'
}

const getUser = async () => {
  const password = 'Kyubi'
  const passwordHash = await bcrypt.hash(password, 8)

  const newUser = new User({
    username: 'Laici998',
    name: 'Ever',
    passwordHash: passwordHash
  })

  return newUser
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  const blogsJson = blogs.map(blog => blog.toJSON())

  return blogsJson
}

const nonExistingId = async () => {
  const blog = new Blog(
    {
      title: 'BlogTitle',
      author: 'BlogAuthor',
      url: 'ExampleUrl',
      likes: 0,
    },
  )

  await blog.save()
  await blog.deleteOne()
  return blog._id.toString()
}

const usersInDb = async () => {
  const users = await User.find({})
  const usersJSON = users.map(user => user.toJSON())
  return usersJSON
}

module.exports = {
  initialBlogs,
  blogsInDb,
  nonExistingId,
  usersInDb,
  getUser,
  user
}