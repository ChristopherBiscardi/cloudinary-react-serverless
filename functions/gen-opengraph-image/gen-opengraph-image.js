const playwright = require("playwright-aws-lambda");
const fs = require("fs");
const script = fs.readFileSync("./dist/bundle-a.js", "utf-8");

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
  console.log("event", JSON.stringify(event.queryStringParameters, null, 2));
  const { queryStringParameters } = event;
  const tags = queryStringParameters.tags
    ? queryStringParameters.tags.split(", ")
    : [];
  await page.addScriptTag({
    content: `
  window.title = "${queryStringParameters.title || "No Title"}";
  window.tags = ${JSON.stringify(tags)};
`
  });
  await page.addScriptTag({ content: script });
  const boundingRect = page.evaluate(() => {
    const corgi = document.getElementById("corgi");
    const corgiSize = corgi.getBoundingClientRect();
    console.log(corgiSize);
    return corgiSize;
  });
  console.log(boundingRect);
  const screenshotBuffer = await page.screenshot({ clip: boundingRect });
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
