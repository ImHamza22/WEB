const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const { userAuth } = require("../middlewares/auth");

router.post("/place-order", userAuth, orderController.placeOrder);
router.get("/my-orders",userAuth, orderController.getUserOrders);
router.get("/orderConfirmation",userAuth, orderController.getConfirmationPage);

module.exports = router;
