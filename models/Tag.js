const mongoose = require('mongoose');
const Cart = require('./Cart');

const TagSchema = new mongoose.Schema({
  tagID: {
    type: String,
    default: '',
  },
  email: {
    type: String,
    default: '',
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'Customer',
  },
  cart: {
    type: mongoose.Types.ObjectId,
    ref: 'Cart',
  },
  qrCode: {
    type: mongoose.Types.ObjectId,
    ref: 'QRCode',
  },
  paymentIntent: '',
});

TagSchema.methods.resetTag = async function () {
  try {
    // Reset Tag data related to a user
    this.email = '';
    this.user = null;
    this.paymentIntent = '';

    // reset Cart related to this Tag
    await Cart.findById(this.cart).resetCart();

    await this.save();

    return true;
  } catch (error) {
    return false;
  }
};

module.exports = mongoose.model('Tag', TagSchema);
