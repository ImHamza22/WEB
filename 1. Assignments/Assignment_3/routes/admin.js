const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const { adminAuth, adminLoginAuth } = require("../middlewares/adminAuth");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images/products');
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const uniqueName = Date.now() + ext;
    cb(null, uniqueName);
  }
});
const upload = multer({ storage: storage });

router.get("/login", adminController.getLogin);
router.post("/login", adminLoginAuth, adminController.login);
router.post("/logout", adminController.logout);

router.get("/", adminAuth, adminController.dashboard);
router.get("/orders", adminAuth, adminController.viewOrders);

router.get("/products", adminAuth, adminController.viewProducts);
router.get("/products/add", adminAuth, adminController.getAddProduct);
router.post('/products/add', upload.single('image'), adminController.addProduct);
router.get("/products/edit/:id", adminAuth, adminController.getEditProduct);
router.post("/products/edit/:id", upload.single('image'), adminController.updateProduct);
router.post("/products/delete/:id", adminAuth, adminController.deleteProduct);

router.get("/about",adminAuth, adminController.about);

module.exports = router; 
