const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");
const { userAuth } = require("../middlewares/auth");

router.get("/", userAuth, cartController.viewCart);
router.get("/checkout", userAuth, cartController.checkout);
router.post('/remove/:productId', userAuth, cartController.removeFromCart);

module.exports = router;
