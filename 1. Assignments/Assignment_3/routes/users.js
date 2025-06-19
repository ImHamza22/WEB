var express = require('express');
var router = express.Router();
const userController = require("../controllers/userController");
const { userLoginAuth } = require("../middlewares/auth");

router.get("/login", userController.getLogin);
router.post("/login", userLoginAuth, userController.login);
router.get("/register", userController.getRegister);
router.post("/register", userController.register);
router.post("/logout", userLoginAuth, userController.logout);

module.exports = router;
