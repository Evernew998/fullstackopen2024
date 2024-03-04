import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      setUser(JSON.parse(loggedUserJSON))
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('handleLogin event', event.target[0])
    console.log('logging in with', username, password)

    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      setUser(user)
      setUsername('')
      setPassword('')
    }
    catch (exception) {
      console.log('exception', exception)
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

  if (user === null) {
    return (
      <form onSubmit={handleLogin}>
        <h2>log in to application</h2>
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
      <div>
        {user.name} logged in
        <button onClick={handleLogOut}>Log out</button>
      </div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App