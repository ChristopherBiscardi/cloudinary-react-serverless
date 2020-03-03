const playwright = require("playwright-aws-lambda");

exports.handler = async function(event, ctx) {
  const browser = await playwright.launchChromium();
  const context = await browser._defaultContext;
  const page = await context.newPage();
  await page.goto("http://whatsmyuseragent.org/");
  const screenshotBuffer = await page.screenshot();
  await browser.close();
  // console.log(screenshotBuffer);
  return {
    isBase64Encoded: true,
    statusCode: 200,
    headers: {
      "Content-Type": "image/png"
    },
    body: screenshotBuffer.toString("base64")
  };
};
