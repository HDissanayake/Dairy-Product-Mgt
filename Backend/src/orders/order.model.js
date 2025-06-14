const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    address: {
      city: { type: String, required: true },
      country: { type: String, required: true },
      state: { type: String, required: true },
      zipcode: { type: String, required: true },
    },
    phone: { type: Number, required: true },
    productIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
    ],
    totalPrice: { type: Number, required: true },

    // ✅ Enum for payment method
    paymentMethod: {
      type: String,
      enum: ['online', 'cashOnDelivery'],
      required: true,
    },

    // ✅ Enum for order status
    status: {
      type: String,
      enum: ['Pending', 'Shipped', 'Delivered', 'Rejected'],
      default: 'Pending',
    },
  },
  { timestamps: true }
);

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
