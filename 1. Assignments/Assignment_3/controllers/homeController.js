// controllers/homeController.js
const Product = require("../models/Product");

exports.index = async (req, res) => {
  try {
    const products = await Product.find({});
    
    // Group products by category
    const productsByCategory = {};
    products.forEach(product => {
      if (!productsByCategory[product.category]) {
        productsByCategory[product.category] = [];
      }
      productsByCategory[product.category].push(product);
    });

    res.render("index", { productsByCategory });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};


