import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
  const blog = {
    title: 'blog title',
    author: 'blog author',
    url: 'blog url',
    likes: 10,
    user: {
      id: '123',
      username: 'evernew',
      name: 'laici'
    }
  }

  const user = {
    token: '123',
    username: 'evernew',
    name: 'laici'
  }

  const mockIncreaseLike = vi.fn()

  let container

  beforeEach(() => {
    container = render(<Blog blog={blog} user={user} increaseLike={mockIncreaseLike} />).container
  })

  test('renders blog title and author but not blog url or blog likes', () => {

    const blogTitleAndAuthor = screen.getByText('blog title blog author')
    expect(blogTitleAndAuthor).toBeDefined()

    const blogInfo = container.querySelector('.blogInfo')
    expect(blogInfo).not.toHaveStyle('display: none')

    const blogInfoFull = container.querySelector('.blogInfoFull')
    expect(blogInfoFull).toHaveStyle('display: none')
  })

  test('clicking the view button displays the blog URL and number of likes', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const blogInfoFull = container.querySelector('.blogInfoFull')
    expect(blogInfoFull).not.toHaveStyle('display: none')
  })

  test('if the like button is clicked twice, the event handler is called twice', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('like')
    await user.click(button)
    await user.click(button)

    expect(mockIncreaseLike.mock.calls).toHaveLength(2)
  })
})
