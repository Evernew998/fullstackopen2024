import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import { expect } from 'vitest'

test('renders blog title and author but not blog url', () => {
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

  const { container } = render(<Blog blog={blog} user={user} />)

  const blogTitleAndAuthor = screen.getByText('blog title blog author')
  expect(blogTitleAndAuthor).toBeDefined()

  const blogInfo = container.querySelector('.blogInfo')
  expect(blogInfo).not.toHaveStyle('display: none')

  const blogInfoFull = container.querySelector('.blogInfoFull')
  expect(blogInfoFull).toHaveStyle('display: none')
})