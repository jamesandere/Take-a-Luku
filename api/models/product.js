const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema(
  {
    brand_id: { type: ObjectId, ref: "Brand", required: true },
    title: { type: String, required: true },
    desc: { type: String, required: true },
    color: { type: String, required: true },
    size: { type: Array },
    tags: { type: Array, required: true },
    price: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    images: { type: Array, required: true },
    gender: { type: String, required: true },
    inStock: { type: Boolean, default: true },
    category: { type: ObjectId, ref: "Category" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
