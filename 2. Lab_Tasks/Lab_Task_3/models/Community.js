const mongoose = require("mongoose");

const communitySchema = new mongoose.Schema({
  name: String,
  email: String,
  insta: String,
  picture: String,
});

module.exports = mongoose.model("Community", communitySchema);