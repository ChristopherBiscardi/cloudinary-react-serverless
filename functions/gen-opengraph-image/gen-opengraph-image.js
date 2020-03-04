const playwright = require("playwright-aws-lambda");
const fs = require("fs");
const script = fs.readFileSync("./dist/bundle-a.js");

exports.handler = async function(event, ctx) {
  const browser = await playwright.launchChromium();
  const context = await browser._defaultContext;
  const page = await context.newPage();
  await page.setContent(`<!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8" />
    </head>
  
    <body>
      <div id="corgi"></div>
  
   
    </body>
  </html>
  `);
  console.log("script next");
  console.log(script);
  await page.addScriptTag({ content: script });
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
