const { test } = require('@playwright/test');
const fs = require('fs');

test('detailed component check', async ({ page }) => {
  const logs = [];

  page.on('console', msg => logs.push(`[${msg.type()}] ${msg.text()}`));

  await page.goto('https://terrastories-upgrade-d4e8ab163f00.herokuapp.com/en/login');
  await page.locator('input[type="text"], input[type="email"]').first().fill('barbara');
  await page.locator('input[type="password"]').first().fill('4UJuc6Cr#AC&4K');
  await Promise.all([
    page.waitForNavigation(),
    page.locator('button, input[type="submit"]').first().click()
  ]);

  const url = page.url();
  if (!url.includes('/home')) {
    await Promise.all([
      page.waitForNavigation(),
      page.click('button:has-text("Enter Site"), a:has-text("Enter Site")')
    ]);
  }

  await page.waitForTimeout(3000);

  const componentStatus = await page.evaluate(() => {
    return {
      appDiv: !!document.querySelector('[data-react-component="App"]'),
      cardDiv: !!document.querySelector('.card'),
      storyListDiv: !!document.querySelector('.stories'),
      reactListDiv: !!document.querySelector('.stories > *'),
      storyDivs: document.querySelectorAll('.story').length,
      cardHTML: document.querySelector('.card')?.innerHTML.substring(0, 500)
    };
  });

  console.log('=== COMPONENT STATUS ===');
  console.log('App mounted:', componentStatus.appDiv);
  console.log('Card rendered:', componentStatus.cardDiv);
  console.log('Stories container:', componentStatus.storyListDiv);
  console.log('ReactList rendered:', componentStatus.reactListDiv);
  console.log('Story items:', componentStatus.storyDivs);
  console.log('\n=== CARD HTML ===');
  console.log(componentStatus.cardHTML);

  fs.writeFileSync('/tmp/component-status.json', JSON.stringify(componentStatus, null, 2));
  fs.writeFileSync('/tmp/console-logs.txt', logs.join('\n'));
});
