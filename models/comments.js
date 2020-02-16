var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var CommentSchema = new Schema({
  comment: {
    type: String,
    required: true
  },
  commentCreated: {
    type: Date,
    default: Date.now
  },
  user: [
    {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  ],
  article: [
    {
      type: Schema.Types.ObjectId,
      ref: "Article"
    }
  ]
});

var Comments = mongoose.model("Comments", CommentSchema);

module.exports = Comments;