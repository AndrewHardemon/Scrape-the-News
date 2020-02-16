// const cheerio = require("cheerio");
// const axios = require("axios");

// console.log("Grabbing the info from the webpage");

// //The website we're grabbing from 
// axios.get("https://www.nytimes.com/").then(function(response){

//   const $ = cheerio.load(response.data);

//   //Grab Headline
//   $("div.assetWrapper").each(function(i, element){
//     let result = {};

//     result.headline = $(element).find("h2").text();

//     result.summary  = $(element).find("p").text();

//     result.link = $(element).find("a").attr("href");

//     result.image = $(element).find("img").attr("src");

//     console.log(result);

//     //Create new Article using the result
//     db.Article.create(result)
//       .then(dbArticle => console.log(dbArticle))
//       .catch(err => console.log(err))
//   });
  
//   //Send message to client
//   res.send("Scrape Complete");
//   console.log(results);
// });
