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

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return undefined
  }

  let blogsCopy = JSON.parse(JSON.stringify(blogs))

  let topBlogger = {
    author: '',
    blogs: 0
  }

  let maxBlogs = 0

  for (let i = 0; i < blogsCopy.length; i++) {
    let numberOfBlogs = 0

    if (blogsCopy[i].author === '@') {
      continue
    }

    const author = blogsCopy[i].author

    for (let j = i; j < blogsCopy.length; j++) {

      if (author === blogsCopy[j].author) {
        blogsCopy[j].author = '@'
        numberOfBlogs ++
      }
    }

    if (numberOfBlogs > maxBlogs) {
      topBlogger = {
        author: author,
        blogs: numberOfBlogs
      }

      maxBlogs = numberOfBlogs
    }
  }
  return topBlogger
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return undefined
  }

  let blogsCopy = JSON.parse(JSON.stringify(blogs))
  let topAuthor = {
    author: '',
    likes: 0
  }

  let maxLikes = 0

  for (let i = 0; i < blogsCopy.length; i++) {
    if (blogsCopy[i].author === '@') {
      continue
    }

    let numberOfLikes = 0
    const author = blogsCopy[i].author

    for (let j = i; j < blogsCopy.length; j++) {

      if (author === blogsCopy[j].author) {
        blogsCopy[j].author = '@'
        numberOfLikes += blogsCopy[j].likes
      }
    }

    if (numberOfLikes > maxLikes) {
      topAuthor = {
        author: author,
        likes: numberOfLikes
      }

      maxLikes = numberOfLikes
    }
  }

  console.log(topAuthor)
  return topAuthor
}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes
}