let express = require("express");
let expressLayouts = require("express-ejs-layouts");
let mongoose = require("mongoose");
const session = require("express-session");

let server = express();

// MongoDB Connection
mongoose.connect("mongodb://localhost:27017/rapuni")
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

// Settings
server.set("view engine", "ejs");
server.use(express.static("public"));
server.use(expressLayouts);
server.use(express.urlencoded({ extended: true }));
server.set("layout", "layouts/app");
server.use(session({
  secret: "your-secret",
  resave: false,
  saveUninitialized: true
}));
server.use((req, res, next) => {
  res.locals.currentUser = req.session.user || null;
  next();
});

// Routes
const homeRoutes = require("./routes/index");
const userRoutes = require("./routes/users");
const productRoutes = require("./routes/products");
const cartRoutes = require("./routes/cart");
const orderRoutes = require("./routes/order");
const adminRoutes = require("./routes/admin");
const contactRoutes = require("./routes/contactUs");

server.use("/", homeRoutes);
server.use("/user", userRoutes);
server.use("/product", productRoutes);
server.use("/cart", cartRoutes);
server.use("/order", orderRoutes);
server.use("/admin", adminRoutes);
server.use("/contact", contactRoutes);

server.listen(4000, () => {
  console.log("Server Started at http://localhost:4000");
});

module.exports = server;


const express = require('express');
const app = express();
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
const vehicleRoutes = require('./routes/vehicles');

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/ecommerce', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(session({ secret: 'secret', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.set('view engine', 'ejs');

// Use routes
app.use('/vehicles', vehicleRoutes);

// Dummy home route
app.get('/', (req, res) => res.redirect('/vehicles'));

// Start server
app.listen(3000, () => console.log('Server running on http://localhost:3000'));
