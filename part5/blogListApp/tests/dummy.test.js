const listHelper = require('../utils/list_helper')

const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
    likes: 5,
    __v: 0,
  },
]

const listWithManyBlogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0,
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 10,
    __v: 0,
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html',
    likes: 10,
    __v: 0,
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0,
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0,
  },
]

const listWithNoBlogs = []

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

  test('when list has many blogs, equals the likes of all blogs', () => {
    const result = listHelper.totalLikes(listWithManyBlogs)
    expect(result).toBe(34)
  })

  test('when list contains no blogs, equals 0', () => {
    const result = listHelper.totalLikes(listWithNoBlogs)
    expect(result).toBe(0)
  })
})

describe('favourite blog', () => {
  test('when list has only one blog, equals that blog', () => {
    const result = listHelper.favouriteBlog(listWithOneBlog)
    expect(result)
      .toEqual({
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        likes: 5,
      })
  })

  test('when list has many blogs, equals blog with most likes. If there are many top favorites, return the first most popular blog.', () => {
    const result = listHelper.favouriteBlog(listWithManyBlogs)
    expect(result)
      .toEqual({
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        likes: 10,
      })
  })

  test('when list has no blogs, equals undefined.', () => {
    const result = listHelper.favouriteBlog(listWithNoBlogs)
    expect(result)
      .toEqual(undefined)
  })
})

describe('most blogs', () => {
  test('when list has many blogs, equals author with most blogs. If there are many top bloggers, return the first top blogger.', () => {
    const result = listHelper.mostBlogs(listWithManyBlogs)
    expect(result)
      .toEqual({
        author: 'Robert C. Martin',
        blogs: 3
      })
  })

  test('when list has one blog, equals author who wrote that blog', () => {
    const result = listHelper.mostBlogs(listWithOneBlog)
    expect(result)
      .toEqual(
        {
          author: 'Edsger W. Dijkstra',
          blogs: 1
        }
      )
  })

  test('when list has no blogs, equals undefined', () => {
    const result = listHelper.mostBlogs(listWithNoBlogs)
    expect(result)
      .toEqual(undefined)
  })
})

describe('most likes', () => {
  test('when list has many blogs, equals author with most total likes. If there are many top authors, return the first top author.', () => {
    console.log('listWithManyBlogs', listWithManyBlogs)
    const result = listHelper.mostLikes(listWithManyBlogs)
    expect(result)
      .toEqual({
        author: 'Edsger W. Dijkstra',
        likes: 15
      })
  })

  test('when list has one blog, equals author who wrote that blog', () => {
    const result = listHelper.mostLikes(listWithOneBlog)
    expect(result)
      .toEqual(
        {
          author: 'Edsger W. Dijkstra',
          likes: 5
        }
      )
  })

  test('when list has no blogs, equals undefined', () => {
    const result = listHelper.mostLikes(listWithNoBlogs)
    expect(result)
      .toEqual(undefined)
  })
})