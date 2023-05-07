const { Router } = require('express');
const router = Router();

const {
  getCart,
  getUserCart,
  addProductToCart,
  removeProductFromCart,
} = require('../controller/cartController');

router.route('/getCart').get(getCart);
router.route('/getUserCart').get(getUserCart);
router.route('/addProductToCart').post(addProductToCart);
router.route('/removeProductFromCart').post(removeProductFromCart);

module.exports = router;
