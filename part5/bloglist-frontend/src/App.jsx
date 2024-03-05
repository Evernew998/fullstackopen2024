import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notificationObject, setNotificationObject] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
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
      }, 4000);
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

  const addBlog = async (event) => {
    event.preventDefault()

    const blogObject = {
      title: title,
      author: author,
      url: url
    }

    try {
      const response = await blogService.create(blogObject)
      console.log(response)
      const newNotificationObject = {
        status: 'success',
        message: `${response.title} by ${response.author} added`
      }
      
      setBlogs(blogs.concat(response))
      setTitle('')
      setAuthor('')
      setUrl('')

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

  if (user === null) {
    return (
      <form onSubmit={handleLogin}>
        <h2>log in to application</h2>
        <Notification notificationObject={notificationObject}/>
        <div>
          username
          <input 
            type="text"
            name='Username'
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          password
          <input 
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
      <h2>create new blogs</h2>
      <form onSubmit={addBlog}>
        <div>
            title:
            <input 
              type="text"
              name='Title'
              value={title}
              onChange={({ target }) => setTitle(target.value)}
            />
        </div>
        <div>
            author:
            <input 
              type="text"
              name='Author'
              value={author}
              onChange={({ target }) => setAuthor(target.value)}
            />
        </div>
        <div>
            url:
            <input 
              type="text"
              name='Url'
              value={url}
              onChange={({ target }) => setUrl(target.value)}
            />
        </div>
        <button type='submit'>create</button>
      </form>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App