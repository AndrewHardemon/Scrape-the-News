var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
  headline:{
    type: String,
    unique: true
  },
  summary:{
    type: String,
    unique: true
  },
  link: {
    type: String,
    unique: true
  },
  image: {
    type: String,
    unique: true
  }
  // Add comments section
});

var Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;