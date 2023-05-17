const User = require('../models/Customer');
const Cart = require('../models/Cart');

const checkIfUserWithMobileExists = async (mobile) => {
  try {
    let user = await User.findOne({ mobile });
    if (user != null) {
      return { success: true, message: 'User Already Exists', exists: true };
    } else
      return { success: true, message: 'User does not exists', exists: false };
  } catch (err) {
    console.log(err);
    return {
      success: false,
      errType: 'Internal Server Error',
      errMessage: err,
    };
  }
};

const checkIfUserWithEmailExists = async (email) => {
  try {
    let user = await User.findOne({ email });
    if (user) {
      return { success: true, exists: true };
    } else return { success: true, exists: false };
  } catch (err) {
    console.log(err);
    return { success: false, errMessage: err };
  }
};

const checkIfCartExists = async (tag) => {
  try {
    let cart = await Cart.findOne({ tag });
    if (cart) return { success: true, exists: true, cart };
    return { success: true, exists: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: err };
  }
};

const checkItemPresentInCart = async (cart, productID) => {
  for (const item of cart.items) {
    if (item.productID == productID)
      return { success: true, present: true, msg: 'item present' };
  }
  return { success: true, present: false, msg: 'item not present' };
};

module.exports = {
  checkIfUserWithMobileExists,
  checkIfUserWithEmailExists,
  checkIfCartExists,
  checkItemPresentInCart,
};
