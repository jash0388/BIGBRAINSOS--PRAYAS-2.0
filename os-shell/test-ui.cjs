const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('BROWSER_CONSOLE:', msg.text()));
  page.on('pageerror', err => console.error('BROWSER_ERROR:', err.toString()));
  
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle2' });
  
  await browser.close();
})();
