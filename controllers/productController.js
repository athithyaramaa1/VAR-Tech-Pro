const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const Product = require("../models/productModel");
const fs = require("fs");

const createProductController = asyncHandler(async (req, res) => {
  try {
    console.log("Incoming request:", req);

    const { name, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;

    console.log(req.fields);

    console.log("Parsed fields:", {
      name,
      description,
      price,
      category,
      quantity,
      shipping,
    });

    if (!description) {
      return res.status(400).json({ message: "Description is required" });
    }

    if (!name || !price || !category || !quantity) {
      return res.status(400).json({ message: "All fields are mandatory" });
    }

    if (photo && photo.size > 1000000) {
      return res.status(400).json({
        message: "Photo is required and size should be less than 1MB",
      });
    }

    const slug = slugify(name);

    const product = new Product({
      name,
      slug,
      description,
      price,
      category,
      quantity,
      shipping,
    });

    if (photo) {
      try {
        product.photo.data = fs.readFileSync(photo.path);
        product.photo.contentType = photo.type;
      } catch (error) {
        console.error("Error reading photo file:", error);
        return res.status(500).json({ error: "Error reading photo file" });
      }
    }

    await product.save();

    res.status(201).json({
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    console.error("Error in creating product:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const getProductsController = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find({})
      .populate("category")
      .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 });
    res.status(200).json({
      message: "All products",
      totalProducts: products.length,
      products,
    });
  } catch (err) {
    console.error("Error in creating product:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const getProductController = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug });
    res.status(200).json({
      message: "Single Product fetched",
      product,
    });
  } catch (err) {
    console.error("Error in creating product:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
module.exports = { createProductController, getProductsController };
