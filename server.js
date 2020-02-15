// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
const express = require("express");
const mongoose = require("mongoose");

//Express
const app = express();


//Middleware and Static Public Folder
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

//Connect to MongoDB
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/articledb";
mongoose.connect(MONGODB_URI);

// Requires
require("./public/js/scrape.js");
const db = require("./models");

//Create User (add way to put in name later)
db.User.create({ name: "Bob"})
  .then(function(dbUser){
    console.log(dbUser);
  })
  .catch(function(err){
    console.log(err.message);
  })

//Routes

//Route for getting Articles
app.get("/articles", function(req, res){
  db.Article.find({})
    .then(dbNote => {res.json(dbNote)})
    .catch(err => {res.json(err)});
});





// Listen on port 3000
app.listen(3000, function() {
  console.log("App running on port 3000!");
});

