const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide the product name"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    description: {
      type: String,
      required: [true, "Please provide the product description"],
    },
    price: {
      type: String,
      required: [true, "Please provide the product's pricing"],
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Please provide the product's respective category"],
    },
    quantity: {
      type: Number,
      required: [true, "Please provide the product's quantity"],
    },
    photo: {
      data: Buffer,
      contentType: String,
      // required: true
    },
    shipping: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);
