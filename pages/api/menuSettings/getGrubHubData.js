const cheerio = require("cheerio");

const scrapeGrubHub = (url) => {
  return fetch(url, {
    method: "GET",
    headers: {
      "User-Agent":
        "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
    },
  })
    .then((res) => {
      const text = res.text();
      return text;
    })
    .then(async (rawText) => {
      const $ = cheerio.load(rawText);

      return $;
    })
    .then(($) => {
      const sections = $("ghs-restaurant-menu-section");
      let data = [];
      sections.each(function (index, section) {
        const sectionName = $(this).attr("impressionid");
        console.log(sectionName);
        let menuItems = [];

        $("ghs-restaurant-menu-item", section).each((index, item) => {
          const itemName = $("[itemprop=name]", item).text();
          const itemDescription = $("[itemprop=description]", item).text();
          const itemPrice = $(".menuItem-displayPrice", item).text();

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

module.exports = async (req, res) => {
  return new Promise(async (resolve) => {
    if (req.method === "POST") {
      const body = JSON.parse(req.body);
      if (!body.url) {
        res.statusCode = 400;
        res.end();
        return resolve();
      }

      const result = await scrapeGrubHub(body.url).catch((err) =>
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
