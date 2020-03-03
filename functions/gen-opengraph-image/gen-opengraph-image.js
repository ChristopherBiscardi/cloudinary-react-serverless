const playwright = require("playwright-aws-lambda");

exports.handler = async function(event, ctx) {
  const browser = await playwright.launchChromium();
  const context = await browser._defaultContext;
  const page = await context.newPage();
  await page.goto("http://whatsmyuseragent.org/");
  const screenshotBuffer = await page.screenshot();
  await browser.close();
  console.log(screenshotBuffer);
  return {
    statusCode: 200,
    body: screenshotBuffer
  };
};
