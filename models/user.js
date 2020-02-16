var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var UserSchema = new Schema({

  name: {
    type: String,
    required: true,
    unique: true
  },
  userCreated: {
    type: Date,
    default: Date.now
  },
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comments"
    }
  ]
});

var User = mongoose.model("User", UserSchema);

module.exports = User;