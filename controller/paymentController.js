const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const Cart = require('../models/Cart');
const Customer = require('../models/Customer');
const Tag = require('../models/Tag');

const calculateOrderAmount = (items) => {
  const orderSum = 0;
  items.array.forEach((item) => {
    orderSum += item.value;
  });
  return 10000
  return orderSum * 100;

};

const getPaymentIntent = async (req, res) => {
  const {
    userInfo: { email },
  } = req.body;
  if(email==undefined) email = 'john@gmail.com'

  const tag_with_cart = await Tag.findOne({ email }).populate('cart');
  const cart = tag_with_cart.cart;

  const ephemeralKey = await stripe.ephemeralKeys.create(
    { customer: email },
    { apiVerson: '2020-08-27' }
  );

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(cart.items),
    currency: 'inr',
    automatic_payment_methods: {
      enabled: true,
    },
    customer: email,
    shipping: defaultShippingDetails,
  });

  tag_with_cart.paymentIntent = paymentIntent;
  await tag_with_cart.save();

  res.json({
    success: true,
    message: 'Payment Intent created successfully',
    clientSecret: paymentIntent.client_secret,
    ephemeralKey: ephemeralKey.secret,
    customer: email,
  });
};

const savePaymentDetails = async (req, res) => {
  const { payment_intent, email } = req.body;

  if (payment_intent.status != 'succeeded') {
    return res.json({
      success: false,
      message: 'Payment not Succeded',
      payment_intent,
    });
  }

  const tag_with_cart = await Tag.findOne({ email }).populate('cart');

  const bill = { payment_intent, cart: tag_with_cart.cart };
  const user = await Customer.findOneAndUpdate(
    { email },
    { $push: { previousBills: bill } }
  );
  await tag_with_cart.resetTag();

  return res.json({
    success: true,
    message: 'Payment details saved susseccfully',
  });
};

module.exports = {
  getPaymentIntent,
  savePaymentDetails,
};
