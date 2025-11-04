const { test } = require('@playwright/test');
const { loginToApp, ensureHome } = require('./support/login');

test('quick story check', async ({ page }) => {
  await loginToApp(page);
  await ensureHome(page);
  await page.waitForTimeout(5000);

  const storyCount = await page.evaluate(() => {
    return document.querySelectorAll('.story').length;
  });

  console.log('Story count:', storyCount);
});
