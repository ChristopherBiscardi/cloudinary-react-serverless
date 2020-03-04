const playwright = require("playwright-aws-lambda");
const fs = require("fs");
const script = fs.readFileSync("./dist/bundle-a.js");

exports.handler = async function(event, ctx) {
  const browser = await playwright.launchChromium();
  const context = await browser._defaultContext;
  const page = await context.newPage();
  await page.addScriptTag({ content: "document.body.innerHTML = 'testing'" });
  const screenshotBuffer = await page.screenshot();
  await browser.close();
  // console.log(screenshotBuffer);
  return {
    isBase64Encoded: true,
    statusCode: 200,
    headers: {
      "Content-Type": "image/png",
      "Content-Length": screenshotBuffer.length
    },
    body: screenshotBuffer.toString("base64")
  };
};
