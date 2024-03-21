import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = async (event) => {
    event.preventDefault()

    const blogObject = {
      title: title,
      author: author,
      url: url,
    }

    await createBlog(blogObject)

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>create new blogs</h2>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input
            data-testid='blogTitle'
            type='text'
            name='Title'
            value={title}
            placeholder='blog title'
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            data-testid='blogAuthor'
            type='text'
            name='Author'
            value={author}
            placeholder='blog author'
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            data-testid='blogUrl'
            type='text'
            name='Url'
            value={url}
            placeholder='blog url'
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default BlogForm
