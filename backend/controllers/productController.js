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
    }
}
