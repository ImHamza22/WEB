const Product = require("../models/Product");

exports.viewCart = async (req, res) => {
  const sessionCart = req.session.cart || [];

  try {
    const productIds = sessionCart.map(item => item.productId);

    const products = await Product.find({ _id: { $in: productIds } });

    const cart = sessionCart.map(item => {
      const product = products.find(p => p._id.toString() === item.productId);
      return {
        product,
        quantity: item.quantity
      };
    }).filter(item => item.product);

    res.render("cart", { cart });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};


exports.checkout = (req, res) => {
  const cart = req.session.cart || [];
  if (cart.length === 0) {
    return res.redirect("/cart");
  }
  res.render("checkout", { cart, layout: "layouts/default", });
};
exports.clearCart = (req, res) => {
  req.session.cart = [];
  res.redirect("/cart");
};
exports.removeFromCart = (req, res) => {
  const productId = req.params.id;
  if (!req.session.cart) {
    return res.redirect("/cart");
  }
  
  req.session.cart = req.session.cart.filter(item => item.productId !== productId);
  res.redirect("/cart");
};

exports.removeFromCart = (req, res) => {
  const productId = req.params.productId;

  if (req.session.cart) {
    req.session.cart = req.session.cart.filter(item => item.productId !== productId);
  }

  res.redirect("/cart");
};