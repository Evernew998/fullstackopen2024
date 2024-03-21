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

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await page.getByTestId('username').fill('mluukkai')
      await page.getByTestId('password').fill('salainen')
      await page.getByRole('button', { name: 'login' }).click()

      await expect(page.getByText('Matti Luukkainen logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await page.getByTestId('username').fill('mluukkai')
      await page.getByTestId('password').fill('wrong')
      await page.getByRole('button', { name: 'login' }).click()

      const errorDiv = page.locator('.error')
      await expect(errorDiv).toHaveCSS('border-style', 'solid')
      await expect(errorDiv).toHaveCSS('color', 'rgb(255, 0, 0)')
      await expect(errorDiv).toContainText('wrong username or password')

      await expect(page.getByText('Matti Luukkainen logged in')).not.toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await page.getByTestId('username').fill('mluukkai')
      await page.getByTestId('password').fill('salainen')
      await page.getByRole('button', { name: 'login' }).click()
    })
  
    test('a new blog can be created', async ({ page }) => {
      await page.getByRole('button',{ name: 'create new blog' }).click()

      await page.getByTestId('blogTitle').fill('Spiderman')
      await page.getByTestId('blogAuthor').fill('Peter Parker')
      await page.getByTestId('blogUrl').fill('spiderman.com')

      await page.getByRole('button',{ name: 'create' }).click()

      const successDiv = page.locator('.success')
      await expect(successDiv).toHaveCSS('border-style', 'solid')
      await expect(successDiv).toHaveCSS('color', 'rgb(0, 128, 0)')
      await expect(successDiv).toContainText('Spiderman by Peter Parker added')

      await expect(page.getByText('Spiderman Peter Parker')).toBeVisible()
    })

    describe('and a blog exists', () => {
      beforeEach(async ({ page }) => {
        await page.getByRole('button',{ name: 'create new blog' }).click()

        await page.getByTestId('blogTitle').fill('Spiderman')
        await page.getByTestId('blogAuthor').fill('Peter Parker')
        await page.getByTestId('blogUrl').fill('spiderman.com')
  
        await page.getByRole('button',{ name: 'create' }).click()

        await page.getByRole('button', { name: 'view' }).click()
      })

      test('a blog can be edited by liking it', async ({ page }) => {
        await page.getByRole('button', { name: 'like' }).click()
        
        await expect(page.getByText('likes 1 ')).toBeVisible()
        await expect(page.locator('.error')).not.toBeVisible()
        /*
        await expect(page.getByText('There was an error when liking the blog "Spiderman" by Peter Parker'))
          .not.toBeVisible()
        */
      })

      test('user who added a blog can delete the blog', async ({ page }) => {
        page.on('dialog', dialog => dialog.accept());
        await page.getByRole('button', { name: 'remove' }).click()

        await expect(page.getByText('Spiderman Peter Parker')).not.toBeVisible()
      })

      test("only the user who added the blog sees the blog's delete button", async ({ page, request }) => {
        await expect(page.getByRole('button', { name: 'remove' })).toBeVisible()
        await page.getByRole('button', { name: 'Log out' }).click()

        await request.post('http://localhost:3003/api/users', {
          data: {
            name: 'Laici',
            username: 'evernew',
            password: 'kyubi'
          }
        })

        await page.getByTestId('username').fill('evernew')
        await page.getByTestId('password').fill('kyubi')
        await page.getByRole('button', { name: 'login' }).click()

        await page.getByRole('button', { name: 'view' }).click()

        await expect(page.getByRole('button', { name: 'remove' })).not.toBeVisible()
      })
    })
  })
})