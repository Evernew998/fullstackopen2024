import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, increaseLike, user, removeBlog }) => {
  const [visible, setVisible] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const showWhenVisible = { display: visible ? '' : 'none' }
  const buttonText = visible ? 'hide' : 'view'

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const incrementLike = async () => {
    const blogToUpdate = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: likes + 1,
      user: blog.user
    }

    await increaseLike(blog.id, blogToUpdate)
    setLikes(likes + 1)
  }

  const deleteBlog = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      removeBlog(blog.id)
    }
  }

  const deleteButton = () => (
    <button onClick={deleteBlog}>remove</button>
  )

  return (
    <div style={blogStyle}>
      <div className='blogInfo'>
        {blog.title} {blog.author} <button onClick={toggleVisibility}>{buttonText}</button>
      </div>
      <div className='blogInfoFull' style={showWhenVisible}>
        <p>{blog.url}</p>
        <p>likes {likes} <button onClick={incrementLike}>like</button></p>
        <p>{blog.user.name}</p>
        {user.username === blog.user.username && deleteButton()}
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  increaseLike: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  removeBlog: PropTypes.func.isRequired
}

export default Blog