import { useState } from "react"

const Blog = ({ blog, increaseLike }) => {
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
      likes: likes + 1
    }

    await increaseLike(blog.id, blogToUpdate)
    setLikes(likes + 1)
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author} <button onClick={toggleVisibility}>{buttonText}</button>
      </div>
      <div style={showWhenVisible}>
        <p>{blog.url}</p>
        <p>likes {likes} <button onClick={incrementLike}>like</button></p>
        <p>{blog.user.name}</p>
      </div>
    </div>
  )
}

export default Blog