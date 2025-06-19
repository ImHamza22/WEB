const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  type: String,
  category: String,
  image: String,
  price: Number,
  stock: Number,
});

module.exports = mongoose.model("Product", productSchema);
