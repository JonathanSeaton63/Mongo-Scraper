var axios = require("axios");
var cheerio = require("cheerio");

const scrape = function(cb) {
  axios.get("https://www.ksl.com/", function(err, res, body){
    const $ = cheerio.load(body);
    const articles = [];

    $("div.queue_story").each(function(i, element){
      const head = $(this).children(".title").text().trim();
      const sum = $(this).children(".summary").text().trim();

      if(head && sum){
        var headNeat = head.replace(/(\r\n|\n|\r|\t|\s+)/gm," ").trim();
        var sumNeat = sum.replace(/(\r\n|\n|\r|\t|\s+)/gm," ").trim();

        const dateToAdd = {
          headline: headNeat,
          summary: sumNeat
        };
        articles.push(dateToAdd);
      }
    });
    cb(articles);
  });
};

module.exports = scrape;
