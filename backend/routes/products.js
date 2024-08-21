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

// get single product by id 
router.get("/singleProduct/:id", productController.singleProduct);

router.put('/addReview/:productId', productController.addReview);

module.exports = router;
