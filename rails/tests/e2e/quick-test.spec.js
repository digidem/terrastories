const { test } = require('@playwright/test');

test('quick story check', async ({ page }) => {
  await page.goto('https://terrastories-upgrade-d4e8ab163f00.herokuapp.com/en/login');
  await page.locator('input[type="text"], input[type="email"]').first().fill('barbara');
  await page.locator('input[type="password"]').first().fill('4UJuc6Cr#AC&4K');
  await page.locator('button, input[type="submit"]').first().click();

  await page.waitForURL('**/home', { timeout: 10000 });
  await page.waitForTimeout(5000);

  const storyCount = await page.evaluate(() => {
    return document.querySelectorAll('.story').length;
  });

  console.log('Story count:', storyCount);
});
