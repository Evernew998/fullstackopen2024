const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http:localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Matti Luukkainen',
        username: 'mluukkai',
        password: 'salainen'
      }
    })

    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByText('log in to application')).toBeVisible()

    await expect(page.getByText('username')).toBeVisible()
    await expect(page.getByTestId('username')).toBeVisible()

    await expect(page.getByText('password')).toBeVisible()
    await expect(page.getByTestId('password')).toBeVisible()
    
    await expect(page.getByRole('button', { name: 'login' })).toBeVisible()
  })
})