const playwright = require("playwright-chromium");

exports.handler = async function(event, ctx) {
  const browser = await playwright.chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("http://whatsmyuseragent.org/");
  const screenshotBuffer = await page.screenshot();
  await browser.close();
  return screenshotBuffer;
};
