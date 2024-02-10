const dummy = (blogs) => {
  console.log(blogs)
  return 1
}

const totalLikes = (blogs) => {
  let totalLikes = 0

  blogs.forEach(blog => {
    totalLikes += blog.likes
  })

  return totalLikes
}

const favouriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return undefined
  }
  let mostPopularBlog = blogs[0]

  blogs.forEach(blog => {
    mostPopularBlog = blog.likes > mostPopularBlog.likes ? blog : mostPopularBlog
  })

  mostPopularBlog = {
    title: mostPopularBlog.title,
    author: mostPopularBlog.author,
    likes: mostPopularBlog.likes
  }

  return mostPopularBlog
}

const createAuthorsArray = (blogs) => {
  const authors = []

  blogs.forEach(blog => {
    const name = blog.author
    let isAuthorInArray = false

    for (let i = 0; i < authors.length; i++) {
      if (authors[i].author === name) {
        isAuthorInArray = true
        break
      }
    }
    if (isAuthorInArray === false) {
      authors.push({
        author: name,
        blogs: 0
      })
    }
  })

  console.log(authors)
  return authors
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return undefined
  }

  const authors = createAuthorsArray(blogs)
  let maxBlogs = 0

  authors.forEach(author => {
    blogs.forEach(blog => {
      if (blog.author === author.author) {
        author.blogs += 1
      }
    })
    maxBlogs = author.blogs > maxBlogs ? author.blogs : maxBlogs
  })

  console.log(authors)
  console.log(maxBlogs)
  console.log(authors.find(author => author.blogs === maxBlogs))
  return authors.find(author => author.blogs === maxBlogs)
}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  createAuthorsArray,
  mostBlogs
}