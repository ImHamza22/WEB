const Order = require("../models/Order");
const Product = require("../models/Product");

exports.placeOrder = async (req, res) => {
  const cart = req.session.cart || [];

  if (cart.length === 0) return res.status(400).send("Cart is empty");

  try {
    const productIds = cart.map(i => i.productId);
    const products = await Product.find({ _id: { $in: productIds } });

    const orderItems = cart.map(item => {
      const product = products.find(p => p._id.toString() === item.productId);
      return {
        productId: product._id.toString(),
        name: product.name,
        price: product.price,
        quantity: item.quantity
      };
    });

    const total = orderItems.reduce((sum, i) => sum + i.price * i.quantity, 0);

    const userId = req.session.userId;
    const userName = req.session.userName;

    const order = new Order({
      userId,
      userName,
      items: orderItems,
      total
    });

    await order.save();

    req.session.cart = [];

    res.status(200).json({ message: "Order placed" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

exports.getUserOrders = async (req, res) => {
    const userId = req.session.userId;

  try {
    const orders = await Order.find({ userId }).sort({ createdAt: -1 });
    res.render("viewOrder", { orders });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};
exports.getConfirmationPage = (req, res) => {
  res.render("templates/orderConfirmation", { user: req.session.user.name || "" });
};
