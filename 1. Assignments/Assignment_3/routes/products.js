const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const { userAuth } = require("../middlewares/auth");

router.get("/:id", productController.getProduct);
router.post("/add-to-cart", userAuth, productController.addToCart);

module.exports = router;
