const playwright = require("playwright-aws-lambda");
const fs = require("fs");
const script = fs.readFileSync("./dist/bundle-a.js", "utf-8");

exports.handler = async function(event, ctx) {
  const browser = await playwright.launchChromium();
  const context = await browser._defaultContext;
  const page = await context.newPage();
  page.setViewportSize({
    width: 1920,
    height: 1080
  });
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
  console.log("event", JSON.stringify(event, null, 2));
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
  const boundingRect = await page.evaluate(() => {
    const corgi = document.getElementById("corgi");
    const { x, y, width, height } = corgi.children[0].getBoundingClientRect();
    return { x, y, width, height };
  });

  const screenshotBuffer = await page.screenshot({ clip: boundingRect });
  await browser.close();
  // console.log(screenshotBuffer);
  return {
    isBase64Encoded: true,
    statusCode: 200,
    headers: {
      "Content-Type": "image/png",
      "Content-Length": screenshotBuffer.length.toString()
    },
    body: screenshotBuffer.toString("base64")
  };
};
