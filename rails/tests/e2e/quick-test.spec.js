const { test, expect } = require('@playwright/test');
const { loginToApp, ensureHome } = require('./support/login');

const hasCreds = ['PLAYWRIGHT_LOGIN_URL', 'PLAYWRIGHT_LOGIN_USERNAME', 'PLAYWRIGHT_LOGIN_PASSWORD']
  .every(key => !!process.env[key]);

const run = hasCreds ? test : test.skip;

run('quick story check', async ({ page }) => {
  await loginToApp(page);
  await ensureHome(page);
  await page.waitForTimeout(5000);

  const storyCount = await page.evaluate(() => {
    return document.querySelectorAll('.story').length;
  });

  expect(storyCount).toBeGreaterThan(0);
});
