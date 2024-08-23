const db = require('../models/product.model');
const uploadFile = require('../cloudinary/Cloudinary');

module.exports = {
    createProduct: async (req, res) => {
        try {
            const productImageLocalPath = req.files?.productImage[0]?.path; // Make sure you're using req.file for a single file

            if (!productImageLocalPath) {
                return res.status(400).json({ message: 'Product image is required' });
            }

            // Upload to Cloudinary
            const productImage = await uploadFile(productImageLocalPath);

            if (!productImage) {
                return res.status(500).json({ message: 'Failed to upload image to Cloudinary' });
            }

            // Create product in database
            const product = await db.create({
                productName: req.body.productName,
                productOrignalPrice: req.body.productOrignalPrice,
                productImage: productImage.url, 
                createdBy: req.body.createdBy,
                productDiscountPrice: req.body.productDiscountPrice,
                productDescription: req.body.productDescription,
                productQuantity: req.body.productQuantity,
                category: req.body.category,
                productBrand: req.body.productBrand,
            });

            res.status(200).json({
                success: true,
                status: 200,
                message: "Product created successfully",
                body: product
            });
        } catch (error) {
            console.error("Product not created:", error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

// get all products

    allProducts : async (req, res) => {
        try {
            const products = await db.find({});
            res.status(200).json({
                success: true,
                status: 200,
                message: "All products fetched successfully",
                body: products
            });
        } catch (error) {
            console.error("Products not fetched:", error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    // get single product by ID

    singleProduct : async (req, res) => {
        try {
            const product = await db.findById(req.params.id);
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.status(200).json({
                success: true,
                status: 200,
                message: "Product fetched successfully",
                body: product
            });
            
        } catch (error) {
            console.error("Product not fetched:", error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    // add review in product
     addReview : async (req, res) => {
        try {
          const { reviewedBy, rating, comment } = req.body;
          const { productId } = req.params;
      
          const product = await db.findById(productId);
      
          if (!product) {
            return res.status(404).json({ message: 'Product not found' });
          }
      
          // Create the review object
          const review = {
            reviewedBy,
            rating,
            comment,
            productId,
          };
      
          // Add the review to the product's reviews array
          product.reviews.push(review);
      
          // Calculate the new average rating
          let avg = 0;
          product.reviews.forEach((rev) => {
            avg += rev.rating;
          });
          product.ratings = avg / product.reviews.length;
      
          // Save the updated product
          await product.save();
      
          res.status(200).json({ message: 'Review added successfully' });
        } catch (error) {
          res.status(500).json({ message: 'An error occurred', error: error.message });
        }
      },   
      
      // get products by category
      
    productsByCategory : async (req, res) => {
        try {
            const { category } = req.params;
            const products = await db.find({ category });
            if (!products) {
                return res.status(404).json({ message: 'Products not found for this category' });
            }
            res.status(200).json({
                success: true,
                status: 200,
                message: "Products fetched successfully for this category",
                body: products
            });
            
        } catch (error) {
            console.error("Products not fetched:", error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    // get products by createdBy 
    
    myProducts : async (req, res) => {
        try {
            const { createdBy } = req.params;
            const products = await db.find({ createdBy });
            if (!products) {
                return res.status(404).json({ message: 'Products not found by this user' });
            }
            res.status(200).json({
                success: true,
                status: 200,
                message: "Products fetched successfully by this user",
                body: products
            });
            
        } catch (error) {
            console.error("Products not fetched:", error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    // delete products
    deleteProduct: async (req, res) => {
        try {
            const { id } = req.params;
            const product = await db.findByIdAndDelete(id);
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.status(200).json({
                success: true,
                status: 200,
                message: "Product deleted successfully",
            });
        } catch (error) {
            console.error("Product not deleted:", error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    // update product
    updateProduct: async (req, res) => {
        try {
            const id = req.params.id;
            const updatedProduct = await db.findByIdAndUpdate(id, req.body, { new: true });
            if (!updatedProduct) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.status(200).json({ message: "Employee updated successfully", updatedProduct });
        } catch (error) {
            console.error("Product not updated:", error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },
}
