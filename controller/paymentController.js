// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

const stripe = require('stripe')(
  'sk_test_51Ms5sSSFh5lBV3HW2mxSXy2r3IqJElUQL7nnlxzkEg8jza6zpvhmWnId3xbrPHvP6lGT4PwMt3mL3Xetbk6NK31U00fpD6B1Ub'
)

const Cart = require('../models/Cart')
const Customer = require('../models/Customer')
const Tag = require('../models/Tag')

const calculateOrderAmount = (items) => {
  const orderSum = 0
  items.array.forEach((item) => {
    orderSum += item.value
  })
  return 10599
  return orderSum * 100
}

const getPaymentIntent = async (req, res) => {
  const { email } = req.body

  // const tag_with_cart = await Tag.findOne({ email }).populate('cart')
  // const cart = tag_with_cart.cart

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 10599,
    currency: 'inr',
  })

  // tag_with_cart.paymentIntent = paymentIntent
  // await tag_with_cart.save()

  res.json({
    success: true,
    message: 'Payment Intent created successfully',
    paymentIntent: paymentIntent.client_secret,
  })
}

const savePaymentDetails = async (req, res) => {
  const { payment_intent, email } = req.body

  if (payment_intent.status != 'succeeded') {
    return res.json({
      success: false,
      message: 'Payment not Succeded',
      payment_intent,
    })
  }

  const tag_with_cart = await Tag.findOne({ email }).populate('cart')

  const bill = { payment_intent, cart: tag_with_cart.cart }
  const user = await Customer.findOneAndUpdate(
    { email },
    { $push: { previousBills: bill } }
  )
  await tag_with_cart.resetTag()

  return res.json({
    success: true,
    message: 'Payment details saved susseccfully',
  })
}

module.exports = {
  getPaymentIntent,
  savePaymentDetails,
}
