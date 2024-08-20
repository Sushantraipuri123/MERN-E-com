var express = require("express");
var router = express.Router();
const upload = require("../middleware/multer-middleware");

var productController = require("../controllers/productController");

router.post(
  "/createProduct",
  upload.fields([
    {
      name: "productImage",
      maxCount: 1,
    },
  ]),
  productController.createProduct
);

router.get("/allProducts", productController.allProducts);

module.exports = router;
