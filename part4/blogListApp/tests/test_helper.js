const Blog = require('../models/blog')

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
  console.log('blog before', blog)
  await blog.save()
  await blog.deleteOne()
  console.log('blog after', blog)
  return blog._id.toString()
}

module.exports = {
  initialBlogs,
  blogsInDb,
  nonExistingId
}