const mongoose = require('mongoose');

const CustomerScheme = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  tag: {
    type: mongoose.Types.ObjectId,
    ref: 'Tag',
  },
  email: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  previousBills: [],
});

module.exports = mongoose.model('User', CustomerScheme);
