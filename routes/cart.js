const { Router } = require('express');
const router = Router();

const {
  getCart,
  getUserCart,
  addProductToCart,
  removeProductFromCart,
} = require('../controller/cartController');

router.route('/get-cart').get(getCart);
router.route('/getUserCart').get(getUserCart);
router.route('/add-product-to-cart').post(addProductToCart);
router.route('/removeProductFromCart').post(removeProductFromCart);

module.exports = router;
