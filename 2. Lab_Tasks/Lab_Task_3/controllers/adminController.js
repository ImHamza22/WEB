const Admin = require("../models/Admin");
const Product = require("../models/Product");
const Order = require("../models/Order");
const bcrypt = require("bcrypt");

// Admin login page
exports.getLogin = (req, res) => {
  res.render("admin/auth/login", { error: null, layout: "layouts/default"});
};

// Login POST
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.render("admin/auth/login", { 
        error: "Admin ID not found.",
        old: {email: email},
        layout: "layouts/default"});
    }

    const match = bcrypt.compare(password, admin.password);
    if (!match) {
        return res.render("admin/auth/login", { 
          error: "Invalid password.",
          old: {email: email},
          layout: "layouts/default"});
  }

    req.session.admin = {
      id: admin._id,
      name: admin.name,
      email: admin.email
    };
    res.redirect("/admin");
  } catch (err) {
    console.error(err);
    return res.render("admin/auth/login", {
                error: "Something went wrong.",
                old: {email: email},
                layout: "layouts/default",
                }); 
    }
};

// Logout
exports.logout = (req, res) => {
  req.session.admin = null;
  res.redirect("/");
};

// Dashboard
exports.dashboard = (req, res) => {
  res.render("admin/dashboard", { admin: req.session.admin, layout: "layouts/admin" });
};

// View all orders
exports.viewOrders = async (req, res) => {
  const orders = await Order.find({});
  res.render("admin/viewOrders", { orders, layout: "layouts/admin" });
};



// Product management
exports.viewProducts = async (req, res) => {
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
  
      res.render("admin/products", { productsByCategory, layout: "layouts/admin" });
    } catch (error) {
      console.error(error);
      res.status(500).send("Server Error");
    }
};

exports.getAddProduct = (req, res) => {
  res.render("admin/addProduct", { layout: "layouts/admin" });
};

exports.addProduct = async (req, res) => {
  try {
    const { name, description, type, category, price, stock } = req.body;
    const image = req.file ? req.file.filename : "";

    const product = new Product({
      name,
      description,
      type,
      category,
      image,
      price: parseFloat(price),
      stock: parseInt(stock)
    });

    await product.save();
    res.redirect("/admin/products");  
  } catch (err) {
    console.error("Failed to add product:", err);
    res.status(500).send("Error saving product");
  }
};

exports.getEditProduct = async (req, res) => {
    try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).send("Product not found");

    res.render("admin/editProduct", { product, layout: "layouts/admin" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { name, description, type, category, price, stock } = req.body;

    const updateData = {
      name,
      description,
      type,
      category,
      price: parseFloat(price),
      stock: parseInt(stock)
    };

    if (req.file) {
      updateData.image = req.file.filename;
    }

    await Product.findByIdAndUpdate(req.params.id, updateData);
    res.redirect("/admin/products");
  } catch (err) {
    console.log("Failed to update product:", err);
    res.status(500).send("Error updating product");
  }
};

exports.deleteProduct = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.redirect("/admin/products");
};


exports.about = (req, res) => {
  res.render("about", { layout: "layouts/admin" });
}