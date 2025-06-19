const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: String,
  description: String,
  headingImage: String,
});

module.exports = mongoose.model("Category", categorySchema);
