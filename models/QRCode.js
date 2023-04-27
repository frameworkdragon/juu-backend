const mongoose = require('mongoose')

const QRCodeSchema = mongoose.Schema({
  // product: {
  //   type: mongoose.Types.ObjectId,
  //   required: true,
  //   ref: 'Product',
  // },
  productName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
})

module.exports = mongoose.model('QRCode', QRCodeSchema)
