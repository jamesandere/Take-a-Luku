const router = require("express").Router();
const express = require("express");
const dotenv = require("dotenv");
const endpointSecret = process.env.ENDPOINT_SECRET;
const stripe = require("stripe")(process.env.STRIPE_KEY);
const { auth, isAdmin, isUser } = require("../middleware/auth");

dotenv.config();

const calculateOrderAmount = (items) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  // items?.map((item) => item.price * 100);
  return 1400;
};

router.post("/create-checkout-session", auth, async (req, res) => {
  const user = req.user;

  const customer = await stripe.customers.create({
    metadata: {
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      name: user.firstName + " " + user.lastName,
      // address: JSON.stringify(user.address),
    },
  });

  const line_items = req.body.cartItems?.map((item) => {
    return {
      price_data: {
        currency: "usd",
        product_data: {
          name: item.title,
          images: [item.images[0]?.url],
          description: item.desc,
          metadata: {
            size: item.size,
            color: item.color,
          },
        },
        unit_amount: item.price * 100,
        tax_behavior: "exclusive",
      },
      adjustable_quantity: { enabled: true, minimum: 1, maximum: 10 },
      quantity: item.quantity,
    };
  });

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    shipping_address_collection: {
      allowed_countries: ["US", "CA", "KE"],
    },
    shipping_options: [
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: { amount: 0, currency: "usd" },
          display_name: "Free shipping",
          delivery_estimate: {
            minimum: { unit: "business_day", value: 5 },
            maximum: { unit: "business_day", value: 7 },
          },
        },
      },
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: {
            amount: 1500,
            currency: "usd",
          },
          display_name: "Next day air",
          // Delivers in exactly 1 business day
          delivery_estimate: {
            minimum: {
              unit: "business_day",
              value: 1,
            },
            maximum: {
              unit: "business_day",
              value: 1,
            },
          },
        },
      },
    ],
    customer: customer.id,
    // customer_email: customer.email,
    line_items,
    // metadata: {
    //   try: "try",
    // },
    phone_number_collection: {
      enabled: true,
    },
    mode: "payment",
    success_url: `${process.env.CLIENT_URL}/`,
    cancel_url: `${process.env.CLIENT_URL}/cart`,
  });

  res.send({ url: session.url });
});

router.post("/create-payment-intent", async (req, res) => {
  const customer = await stripe.customers.create({
    // metadata: {
    //   userId: req.body.userId,
    // },
  });

  const { items, total } = req.body;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: total * 100,
    currency: "usd",
    automatic_payment_methods: {
      enabled: true,
    },
    customer: customer.id,
    // payment_method_types: ["link", "card"],
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  async (request, response) => {
    const payload = request.body;
    const sig = request.headers["stripe-signature"];

    let event;

    try {
      event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
      console.log(event.type);
    } catch (err) {
      response.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    if (event.type === "charge.succeeded") {
      console.log(event.data.object?.shipping?.address);
    }

    response.send().end();
  }
);

module.exports = router;
