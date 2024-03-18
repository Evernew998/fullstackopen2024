import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('The form calls the event handler it received as props with the right details when a new blog is created', async () => {
  const createBlog = vi.fn()
  const user = userEvent.setup()

  render(<BlogForm createBlog={createBlog} />)

  const titleInput = screen.getByPlaceholderText('blog title')
  const authorInput = screen.getByPlaceholderText('blog author')
  const urlInput = screen.getByPlaceholderText('blog url')
  const createButton = screen.getByText('create')

  await user.type(titleInput, 'new title')
  await user.type(authorInput, 'new author')
  await user.type(urlInput, 'new url')

  await user.click(createButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('new title')
  expect(createBlog.mock.calls[0][0].author).toBe('new author')
  expect(createBlog.mock.calls[0][0].url).toBe('new url')
})