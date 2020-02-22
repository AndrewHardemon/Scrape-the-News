var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var UserSchema = new Schema({

  name: {
    type: String,
    required: true
  },
  userCreated: {
    type: Date,
    default: Date.now
  }
});

var User = mongoose.model("User", UserSchema);

module.exports = User;