import cheerio from "cheerio";
import axios from "axios";
//const nodeFetch = require("node-fetch");

export default (url) => {
  console.log("working here");
  const H = new Headers();
  return axios
    .get(url, {
      method: "GET",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
      },
    })
    .then((res) => {
      const text = res.text();
      console.log(text);
      return text;
    })
    .then(async (rawText) => {
      const $ = cheerio.load(rawText);
      console.log(rawText);

      return $;
    })
    .then(($) => {
      const sections = $("ghs-restaurant-menu-section");
      let data = [];
      sections.each((index, section) => {
        const sectionName = section.attribs["impressionId"];
        let menuItems = [];

        $("ghs-restaurant-menu-item", section).each((index, item) => {
          const itemName = $("[itemprop=name]", item).text();
          const itemDescription = $("[itemprop=description]", item).text();
          const itemPrice = $(".menuItem-displayPrice", item).text();
          console.log(`PRICE ${itemPrice}`);

          const itemData = {
            name: itemName,
            description: itemDescription,
            price: itemPrice,
          };

          menuItems.push(itemData);
        });

        const categoryData = { name: sectionName, menuItems };
        data.push(categoryData);
      });

      return data;
    });
};
