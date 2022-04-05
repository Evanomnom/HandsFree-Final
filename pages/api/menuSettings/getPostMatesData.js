const cheerio = require("cheerio");

//there's a lot of duplicated code in the different get_datas and could be combined into
//one big file with many ifs but i think that might be less elegant
const scrapePostMates = (url) => {
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
      const sections = $(".css-135ydxp.e1u06svg2");
      let data = [];

      //find the name of each section
      sections.each(function (index, section) {
          //classes used for the actually field with the name of the section
          let sectionName = $(".e1u06svg0", section).text();
          if (!sectionName) {
            sectionName = "failed";
          }
          let menuItems = [];
          
          //find the menu items of each section
          $(".product-container", section).each((index, item) => {
              //respective class names used for the name description and price
              const itemName = $(".product-name", item).text();
              const itemDescription = $(".product-description", item).text();
              //note that if there is no price (or variable price) this will return ""
              //remove .css-yzlrwy if you want unavailable items to have prices
              const itemPrice = $(".css-yzlrwy.e1tw3vxs6", item).text();

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

export default (req, res) => sendRequest(req, res);

async function sendRequest(req, res) {
    return new Promise(async (resolve) => {
      if (req.method === "POST") {
        const body = JSON.parse(req.body);
        if (!body.url) {
          res.statusCode = 400;
          res.end();
          return resolve();
        }
  
        const result = await scrapePostMates(body.url).catch((err) =>
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