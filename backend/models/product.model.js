var mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productName:{
        type: String,
        required: true,
        trim: true,
    },
    productOrignalPrice:{
        type: Number,
        // required: true
    },
    productDiscountPrice:{
        type: Number,
        default: 0,
    },
    productImage:{
        type: String,
        // required: true,
    },
    productDescription:{
        type: String,
        // required: true,
    },
    productQuantity:{
        type: Number,
        // required: true
    },
    category:{
        type : String,
        // required: true
    },
    productBrand:{
        type: String,
        // required: true
    },
    // reviews: [
    //     {
    //         rating: {
    //             type: Number,
    //             // required: true,
    //             min: 1,
    //             max: 5, // Assuming a 5-star rating system
    //         },
    //         comment: {
    //             type: String,
    //             // required: true,
    //         },
    //         reviewedBy: {
    //             type: mongoose.Schema.ObjectId,
    //             ref: "User",
    //             // required: true,
    //         },
    //     },
    // ],
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
},{timestamps: true});

// Ensure creatorName and creatorId are populated from the User document
productSchema.pre('save', async function(next) {
    if (this.isModified('createdBy')) {
        const user = await mongoose.model('User').findById(this.createdBy);
        if (user) {
            console.log('User Data:', user); // Log user data here
            this.creatorName = user.username; 
            this.creatorId = user._id;
        }
    }
    next();
});

module.exports = mongoose.model('Product', productSchema);