var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var CommentSchema = new Schema({
  comment: {
    type: String,
    required: true
  },
  user: [
    {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  ]
});

var Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;