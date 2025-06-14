const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  trending: {
    type: Boolean,
    required: true,
  },
  unit: {
    type: String,
    required: false, // Required because your form requires it
  },
  coverImage: {
    type: String,
    required: true,
  },
  oldPrice: {
    type: Number,
    required: true,
  },
  newPrice: {
    type: Number,
    required: true,
  },
},
{
  timestamps: true,
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
