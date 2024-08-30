const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    orderdProduct: {
      type: mongoose.Schema.ObjectId,
      ref: "Product",
    },
    orderdBy: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    orderStatus: {
      type: String,
      enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
    orderPrice: {
      type: String, // Change to Number if this is a numeric value
      // required: true,
    },
    orderQuantity: {
      type: String, // Change to Number if this is a numeric value
      // required: true,
    },
    phoneNumber: {
      type: String,
      required: [true, "Please enter your Phone Number!"],
    },
    addresses: [
      {
        country: { type: String },
        city: { type: String },
        address: { type: String },
        NerabyLandMark: { type: String },
        Pincode: { type: String }, // Pincode as String
      },
    ],
    paymentMethods: {
      type: String,
      required: true,
    },
    seller: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    selectedSize:{
        type: String,
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", orderSchema);
