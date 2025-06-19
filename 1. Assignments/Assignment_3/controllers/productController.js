const Product = require("../models/Product");

exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).send("Product not found");

    res.render("product", { product });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

exports.addToCart = (req, res) => {
  const productId = req.body.productId;
  const quantity = parseInt(req.body.quantity) || 1;

  if (!req.session.cart) {
    req.session.cart = [];
  }

  const existingItem = req.session.cart.find(item => item.productId === productId);
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    req.session.cart.push({ productId, quantity });
  }

  res.redirect("/cart");
};
