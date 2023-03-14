const mongoose = require("mongoose");
const { ObjectId } = new mongoose.Schema();

const orderSchema = new mongoose.Schema(
  {
    user_id: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
    customer_id: { type: String, required: true },
    products: [
      {
        type: ObjectId,
        ref: "Product",
        required: true,
      },
    ],
    subtotal: { type: String, required: true },
    total: { type: String, required: true },
    shipping: { type: Object, required: true },
    isPaid: { type: Boolean, default: false },
    paidAt: { type: Date },
    isDelivered: { type: Boolean, default: false },
    deliveredAt: { type: Date },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
