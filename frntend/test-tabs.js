const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1920, height: 1080 });

  console.log('Opening requests/5 (error request)...');
  await page.goto('http://localhost:3000/requests/5');
  await page.waitForTimeout(1000);

  // Take screenshot of Request tab
  console.log('Screenshot: Request tab');
  await page.screenshot({ path: '/tmp/tab-request.png' });

  // Click Response tab
  console.log('Clicking Response tab...');
  await page.click('button:has-text("Response")');
  await page.waitForTimeout(500);
  await page.screenshot({ path: '/tmp/tab-response.png' });

  // Click Logs tab
  console.log('Clicking Logs tab...');
  await page.click('button:has-text("Logs")');
  await page.waitForTimeout(500);
  await page.screenshot({ path: '/tmp/tab-logs.png' });

  console.log('All screenshots saved!');
  await browser.close();
})();
