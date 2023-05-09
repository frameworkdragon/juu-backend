const Cart = require('../models/Cart');
const Product = require('../models/Product');
const Tag = require('../models/Tag');

const { checkItemPresentInCart } = require('../utils');

const getCart = async (req, res) => {
  const { tagID } = req.body;

  try {
    const tag_with_cart = await Tag.findOne({ tagID }).populate('cart');
    console.log(tag_with_cart.cart);

    if (tag_with_cart.cart)
      return res.status(200).json({
        success: true,
        message: 'Cart exists',
        cart: tag_with_cart.cart,
      });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ success: false, error: err });
  }
};

const addProductToCart = async (req, res) => {
  const { tagID, productID, qty } = req.body;
  console.log(req.body);

  const tag_with_cart = await Tag.findOne({ tagID }).populate('cart');
  if (!tag_with_cart.email)
    return res
      .status(400)
      .json({ success: false, message: 'Cart it not initialized' });

  const cart = tag_with_cart.cart;

  const product = await Product.findOne({ tag: productID });
  console.log(product);

  const response = await checkItemPresentInCart(cart, productID);
  console.log(response);
  if (response.present) {
    await Cart.findByIdAndUpdate(
      cart._id,
      {
        $inc: {
          'items.$[elem].quantity': qty,
          'items.$[elem].value': qty * product.price,
        },
      },
      { arrayFilters: [{ 'elem.tag': productID }] }
    );

    return res.status(200).json({
      success: true,
      messsage: 'Cart updated',
    });
  }

  const item = {
    quantity: qty,
    value: product.price * qty,
    productID,
  };

  await Cart.findByIdAndUpdate(cart._id, { $push: { items: item } });

  return res.status(200).json({ success: true, message: 'item added to cart' });
};

const removeProductFromCart = async (req, res) => {
  const { tagID, productID } = req.body;

  const tag_with_cart = await Tag.findOne({ tagID }).populate('cart');

  const response = await checkItemPresentInCart(tag_with_cart.cart, productID);
  console.log(response);
  if (response.present) {
    const cart = await Cart.findById(tag_with_cart.cart._id);
    cart.items = cart.items.filter((item) => item.productID !== productID);
    await cart.save();

    return res.status(200).json({
      success: true,
      messsage: 'Cart updated',
    });
  }

  return res
    .status(200)
    .json({ success: true, message: 'Item not found on Cart' });
};

const getUserCart = async (req, res) => {
  const { email } = req.body;

  const tag_with_cart = await Tag.findOne({ email }).populate('cart');
  return res.status(200).send({ success: true, cart: tag_with_cart.cart });
};

module.exports = {
  getUserCart,
  addProductToCart,
  removeProductFromCart,
  getCart,
};
