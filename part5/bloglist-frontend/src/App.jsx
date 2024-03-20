import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notificationObject, setNotificationObject] = useState(null)

  useEffect(() => {
    blogService.getAll()
      .then(blogs => {
        const sortedBlogs = [...blogs]
        sortedBlogs.sort((a, b) => {
          if (a.likes > b.likes) {
            return -1
          }
          else if (a.likes === b.likes) {
            return 0
          }
          else {
            return 1
          }
        })

        setBlogs(sortedBlogs)
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('handleLogin event', event.target[0])
    console.log('logging in with', username, password)

    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    }
    catch (exception) {
      console.log('exception', exception)
      const newNotificationObject = {
        status: 'error',
        message: 'wrong username or password'
      }

      setNotificationObject(newNotificationObject)
      setTimeout(() => {
        setNotificationObject(null)
      }, 4000)
    }
  }

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleLogOut = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
  }

  const blogFormRef = useRef()

  const addBlog = async (blogObject) => {
    try {
      const response = await blogService.create(blogObject)
      console.log(response)
      const newNotificationObject = {
        status: 'success',
        message: `${response.title} by ${response.author} added`
      }

      setBlogs(blogs.concat(response))

      blogFormRef.current.toggleVisibility()

      setNotificationObject(newNotificationObject)
      setTimeout(() => {
        setNotificationObject(null)
      }, 4000)
    }
    catch (exception) {
      console.log(exception)

      const newNotificationObject = {
        status: 'error',
        message: `There was an error when adding ${blogObject.title} by ${blogObject.author}`
      }

      setNotificationObject(newNotificationObject)

      setTimeout(() => {
        setNotificationObject(null)
      }, 4000)
    }
  }

  const incrementLike = async (id, blogObject) => {
    try {
      const updatedBlog = await blogService.update(id, blogObject)
      console.log(updatedBlog)

      const updatedBlogs = blogs.map(b => b.id === updatedBlog.id ? updatedBlog : b)
      updatedBlogs.sort((a, b) => {
        if (a.likes > b.likes) {
          return -1
        }
        else if (a.likes === b.likes) {
          return 0
        }
        else {
          return 1
        }
      })

      setBlogs(updatedBlogs)
    }
    catch (exception) {
      console.log(exception)

      const newNotificationObject = {
        status: 'error',
        message: `There was an error when liking the blog "${blogObject.title}" by ${blogObject.author}`
      }

      setNotificationObject(newNotificationObject)

      setTimeout(() => {
        setNotificationObject(null)
      }, 4000)
    }
  }

  const deleteBlog = async (blogId) => {
    try {
      const response = await blogService.deleteBlog(blogId)
      const filteredBlogs = blogs.filter(blog => blog.id !== blogId)

      setBlogs(filteredBlogs)
    }
    catch (exception){
      const newNotificationObject = {
        status: 'error',
        message: 'There was an error when deleting blog'
      }

      setNotificationObject(newNotificationObject)

      setTimeout(() => {
        setNotificationObject(null)
      }, 4000)
    }
  }

  if (user === null) {
    return (
      <form onSubmit={handleLogin}>
        <h2>log in to application</h2>
        <Notification notificationObject={notificationObject}/>
        <div>
          username
          <input
            data-testid='username'
            type="text"
            name='Username'
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          password
          <input
            data-testid='password'
            type="password"
            name='Password'
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button type='submit'>login</button>
      </form>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification notificationObject={notificationObject}/>
      <div>
        {user.name} logged in
        <button onClick={handleLogOut}>Log out</button>
      </div>
      <Togglable buttonLabel='create new blog' ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>
      {blogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          increaseLike={incrementLike}
          user={user}
          removeBlog={deleteBlog}
        />
      )}
    </div>
  )
}

export default App