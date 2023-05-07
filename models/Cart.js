const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
  tag: {
    type: mongoose.Types.ObjectId,
    ref: 'Tag',
  },
  value: {
    type: Number,
    default: 0,
  },
  quantity: {
    type: Number,
    default: 0,
  },
  items: [],
});

CartSchema.methods.resetCart = async function () {
  try {
    this.value = 0;
    this.quantity = 0;
    this.items = [];

    await this.save();

    return true;
  } catch (error) {
    return false;
  }
};

module.exports = mongoose.model('Cart', CartSchema);
