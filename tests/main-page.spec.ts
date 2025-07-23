import { test, expect } from '@playwright/test'

test.describe('Главная страница', () => {
    test('открывается и содержит ожидаемый элемент', async ({ page }) => {
        await page.goto('/')

        const locator = page.locator('id=create-button')

        await expect(locator).toHaveText('Create')
    })
})
