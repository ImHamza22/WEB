var express = require('express');
var router = express.Router();
const contactController = require("../controllers/contactController");
const { userAuth } = require("../middlewares/auth");
const { adminAuth } = require("../middlewares/adminAuth");

router.get("/complaint", userAuth, contactController.getContactForm);
router.post("/complaint", userAuth, contactController.submitContactForm);

router.get("/complaint/my", userAuth, contactController.getMyComplaints);
router.get("/complaint/all", adminAuth, contactController.getAllComplaints);

module.exports = router;
