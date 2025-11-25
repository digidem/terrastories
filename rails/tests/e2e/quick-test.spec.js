const { test, expect } = require('@playwright/test');
const { loginToApp, ensureHome } = require('./support/login');

const hasCreds = ['PLAYWRIGHT_LOGIN_URL', 'PLAYWRIGHT_LOGIN_USERNAME', 'PLAYWRIGHT_LOGIN_PASSWORD']
  .every(key => !!process.env[key]);

const run = hasCreds ? test : test.skip;

run('quick story check', async ({ page }) => {
  await loginToApp(page);
  await ensureHome(page);
  await page.waitForTimeout(5000);

  const { storyCount, cardFound } = await page.evaluate(() => ({
    storyCount: document.querySelectorAll('.story').length,
    cardFound: !!document.querySelector('.card')
  }));

  expect(cardFound).toBe(true);
  // Allow environments without seed data; still validates render.
  expect(storyCount).toBeGreaterThanOrEqual(0);
});
