const cheerio = require("cheerio");
const axios = require("axios");

console.log("Grabbing the info from the webpage");

axios.get("https://www.nytimes.com/").then(function(response){

  const $ = cheerio.load(response.data);

  var results = [];

  //Grab Headline
  $("div.assetWrapper").each(function(i, element){
    const headline = $(element).find("h2").text();

    const summary  = $(element).find("p").text();

    const link = $(element).find("a").attr("href");

    const image = $(element).find("img").attr("src");

    results.push({
      headline: headline,
      summary: summary,
      link: link,
      image: image
    })
  });

  console.log(results);
})