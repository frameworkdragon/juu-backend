const mongoose = require('mongoose');

const QRCodeSchema = mongoose.Schema({
  qrCodeID: {
    type: String,
  },
  image: {
    type: String,
  },
  description: {
    type: String,
  },
});

module.exports = mongoose.model('QRCode', QRCodeSchema);
