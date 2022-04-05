const scrapeGrubHub = require("./scrapeGrubHub");
const fs = require("fs");

async function main() {
  const result = await scrapeGrubHub(
    "https://www.grubhub.com/restaurant/tds-of-clemson-339-college-ave-clemson/1094598"
  );

  //console.log(JSON.stringify(result));

  fs.writeFileSync("./out.json", JSON.stringify(result));
}

main();
