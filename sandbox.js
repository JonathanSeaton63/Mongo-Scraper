const request = require('axios');
const cheerio = require('cheerio');

(async() => {

  await request('https://www.ksl.com/')
  .then((res) => {
    const $ = cheerio.load(res.data);
    const articles = [];

    $("div.queue_story").each(function(i, element){
       let title = $(this).find("div").find("h2").text();
    //    console.log(title)
       let summary = $(this).find("div").find("h5").text();
    //    console.log(summary)
       let url = $(this).find("div").find("h2").find("a").attr("href");
    //    console.log(url);

       articles.push({title, summary, url});
    });
    console.log(articles);
  })

})()