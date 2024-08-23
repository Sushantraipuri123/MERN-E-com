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

// add reviews to products 
router.put('/addReview/:productId', productController.addReview);

// get porducts by category

router.get('/productsByCategory/:category', productController.productsByCategory);

// get product by created by 

router.get('/myProducts/:createdBy', productController.myProducts);

// delete products 

router.delete('/deleteProduct/:id', productController.deleteProduct);

// update products

router.post('/updateProduct/:id', productController.updateProduct);


module.exports = router;
