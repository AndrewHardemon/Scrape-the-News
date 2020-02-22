// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
const express = require("express");
const mongoose = require("mongoose");
var exphbs = require("express-handlebars");
// Other
const cheerio = require("cheerio");
const axios = require("axios");
//Express
const app = express();


//Middleware and Static Public Folder
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

//Connect to MongoDB
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/articledb";
mongoose.connect(MONGODB_URI);

// Requires
require("./public/js/scrape.js");
// require("./public/js/app.js");
require("./routes/htmlRoutes.js")(app);
const db = require("./models");
var User = require("./models/user.js")
var Comments = require("./models/comments.js")
// var Article = require("./models/article.js")

//Handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


// Create User (add way to put in name later)
// db.Comment.create({ comment: "Bob"})
//   .then(function(dbComment){
//     console.log(dbComment);
//   })
//   .catch(function(err){
//     console.log(err.message);
//   })

// Scrape

//The website we're grabbing from 
axios.get("https://www.nytimes.com/").then(function(response){
const $ = cheerio.load(response.data);
//Grab Headline
$("div.assetWrapper").each(function(i, element){
  let result = {};
  result.headline = $(element).find("h2").text();
  result.summary  = $(element).find("p").text();
  result.link = $(element).find("a").attr("href"); 
  result.image = $(element).find("img").attr("src");
  console.log(result);
  //Create new Article using the result 
  db.Article.create(result)
    .then(dbArticle => console.log(dbArticle))
    .catch(err => console.log(err))
});
  //Send message to client
  res.send("Scrape Complete");
  console.log(results);
}); 


//Routes
app.post("/submit", function(req, res){
  console.log(req.body.username);
  var user = new User(req.body);
  db.User.create({name: req.body.username})
    .then(dbUser => res.json(dbUser))
    .catch(err => res.json(err))
  return res.redirect('/home');
});


app.get("/submit", function(req, res){
  db.User.find({})
    .then(dbUser => res.json(dbUser))
    .catch(err => res.json(err));
});

//Route for getting Articles
app.get("/articles", function(req, res){
  db.Article.find({})
    .then(dbArticle => res.json(dbArticle))
    .catch(err => res.json(err));
});


// app.post("/gettingComments", function(req, res){
//   console.log(req.body);
//   var comment = new Comments({comment: req.body.comment});
//   db.Comments.create({comment: req.body.comment})
//     .then(dbComments => res.json(dbComments))
//     .catch(err => res.json(err))
//     // return res.redirect('/home');
// });

// //Route for getting Articles
// app.get("/gettingComments", function(req, res){
//   db.Comments.find({})
//     .then(dbComments => res.json(dbComments))
//     .catch(err => res.json(err));
// });

app.get("/articles/:id", function(req, res){
  db.Article.findOne({ _id: req.params.id })
    .populate("comments")
    .then(dbArticle => res.json(dbArticle))
    .catch(err => res.json(err))
})

app.post("/articles/:id", function(req, res){
  db.Comments.create(req.body)
    .then(function(dbComments){
      return db.Article.findOneAndUpdate({_id: req.params.id}, {$push: {comments: dbComments._id}}, {new:true});
    })
    .then(dbArticle => res.json(dbArticle))
    .catch(err => res.json(err))
})



const port = process.env.PORT || 3000;
// Listen on port 3000
app.listen(port, '0.0.0.0', function() {
  console.log("App running on port 3000!");
});

