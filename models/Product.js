const mongoose = require('mongoose')

const ProductSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  availableQty: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  productID: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
})

module.exports = mongoose.model('Product', ProductSchema)
