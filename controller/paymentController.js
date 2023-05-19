const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

// Test key
// const stripe = require('stripe')(
//   'sk_test_51Ms5sSSFh5lBV3HW2mxSXy2r3IqJElUQL7nnlxzkEg8jza6zpvhmWnId3xbrPHvP6lGT4PwMt3mL3Xetbk6NK31U00fpD6B1Ub'
// )

const Cart = require('../models/Cart')
const Customer = require('../models/Customer')
const Tag = require('../models/Tag')

const calculateOrderAmount = (items) => {
  let amount = 0
  let quantity = 0
  items.forEach((item) => {
    amount += item.value
    quantity += item.quantity
  })
  amount *= 100
  return { amount, quantity }
}

const createPaymentIntent = async (req, res) => {
  try {
    const { email } = req.body

    const tag_with_cart = await Tag.findOne({ email }).populate('cart')
    const cart = tag_with_cart.cart.toObject()

    if (cart.length < 1) {
      return res.status(400).json({
        success: false,
        error: { message: error, type: 'Cart is empty.' },
      })
    }

    const { amount, quantity } = calculateOrderAmount(cart.items)
    // const customer = await stripe.customers.create({ email })
    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'inr',
      // customer: customer.id,
    })

    tag_with_cart.paymentIntent = paymentIntent
    await tag_with_cart.save()
    res.json({
      success: true,
      message: 'Payment Intent created successfully',
      paymentIntent: paymentIntent.client_secret,
      checkoutInfo: { amount, ...cart, quantity },
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: { message: error, type: 'Internal Server Error' },
    })
  }
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
    message: 'Payment details saved successfully',
  })
}

// Expose a endpoint as a webhook handler for asynchronous events.
// This is your Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret = "whsec_195f348b42541bd281c957dc067bada6ffba36e6d152b81dec802b515c1e1a64";
const handlePaymentSucceed = async (req, res) => {
  const sig = request.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
  } catch (err) {
    response.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntentSucceeded = event.data.object;
      // Then define and call a function to handle the event payment_intent.succeeded
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  response.send();

}

const getStripeKeys = async (req, res) => {
  return res.status(200).json({ publishableKey: process.env.STRIPE_PUBLIC_KEY })
}
module.exports = {
  getStripeKeys,
  createPaymentIntent,
  savePaymentDetails,
  handlePaymentSucceed,
}
