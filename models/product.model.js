import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  quantity: Number,
});

// MODEL
const Product = mongoose.model("Product", productSchema);

export default Product;
