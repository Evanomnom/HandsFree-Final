const cheerio = require("cheerio");

const scrapeDoorDash = (url) => {
  //get call to the url given
  return fetch(url, {
    method: "GET",
    headers: {
      "User-Agent":
        "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
    },
  })
  //get the html representation of the page
    .then((res) => {
      const text = res.text();
      return text;
    })
    .then(async (rawText) => {
      const $ = cheerio.load(rawText);

      return $;
    })
    //use jquery to find the desired fields
    .then(($) => {
      //these are the classes used in the divs on doordash for sections
      //      const sections = $(".sc-VuRhl.dyPiJt");
      const sections = $(".sc-kGYfcE.fuCDMM");

      let data = [];

      //find the name of each section
      sections.each(function (index, section) {
          //classes used for the actually field with the name of the section
          //const sectionName = $(".sc-eIVEXM.gvAeht", section).text();
          const sectionName = $(".sc-bsBFbB.gUqIoK", section).text();
          let menuItems = [];
          
          //find the menu items of each section
          $(".sc-igaqVs.bHhrDu", section).each((index, item) => {
              //respective class names used for the name description and price
              const itemName = $(".sc-bdVaJa.gImhEG", item).text();
              const itemDescription = $(".sc-bdVaJa.huydyu", item).text();
              //note that if there is no price (or variable price) this will return ""
              const itemPrice = $(".sc-bdVaJa.eEdxFA", item).text();

              const itemData = {
                  name: itemName,
                  description: itemDescription,
                  price: itemPrice
              }
              //add the item to the menu items array
              menuItems.push(itemData);;
          })
          //add the section to the data array to push
          data.push({name: sectionName, menuItems})
      })
      return data;
    });
};

module.exports = async (req, res) => {
  return new Promise(async (resolve) => {
    if (req.method === "POST") {
      const body = JSON.parse(req.body);
      if (!body.url) {
        res.statusCode = 400;
        res.end();
        return resolve();
      }

      const result = await scrapeDoorDash(body.url).catch((err) =>
        res.status(500)
      );

      res.statusCode = 200;
      res.end(JSON.stringify({ result }));
      resolve();
    } else {
      res.statusCode = 400;

      res.end();
      return resolve();
    }
  });
};
