const { Router } = require("express");
const Order = require("../models/orderModel");
const router = Router();
const stripe = require("stripe")("sk_test_2bSHQqY6BaRspJCMCD4fe2Fl00wgGzC6Sx");
const { v4: uuidv4 } = require("uuid");

router.post("/place-order", async (req, res) => {
  const { token, subtotal, currentUser, cartItems } = req.body;

  try {
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    // currency is optional and defaults to USD ($)
    const payment = await stripe.charges.create(
      {
        amount: subtotal * 100,
        currency: "USD",
        customer: customer.id,
        receipt_email: token.email,
      },
      {
        idempotencyKey: uuidv4(),
      }
    );

    if (payment) {
      const newOrder = new Order({
        name: currentUser.name,
        email: currentUser.email,
        userId: currentUser._id,
        orderItems: cartItems,
        orderAmount: subtotal,
        shippingAddress: {
          street: token.card.address_line1,
          city: token.card.address_city,
          country: token.card.address_country,
          pincode: token.card.address_zip,
        },
        transactionId: payment.source.id,
      });
      console.log("newOrder", newOrder);
      await newOrder.save();
      res.status(200).json({ message: "Order placed successfully 🥳" });
    }
  } catch (error) {
    console.log("error", error);
    return res
      .status(400)
      .json({ message: "Something went wrong, payment failed 🤕" });
  }
});

router.post("/user-orders", async (req, res) => {
  const { userId } = req.body;
  try {
    const orders = await Order.find({ userId }).sort({ _id: -1 });
    res.status(200).json(orders);
  } catch (error) {
    return res.status(400).json({ message: "Cannot load orders 🤕" });
  }
});

router.get("/all-orders", async (req, res) => {
  try {
    const orders = await Order.find({}).sort({ _id: -1 });
    res.status(200).json(orders);
  } catch (error) {
    return res.status(400).json({ message: "Cannot load orders 🤕" });
  }
});

router.post("/deliver-order", async (req, res) => {
  const { orderId } = req.body;

  try {
    const order = await Order.findOne({ _id: orderId });
    order.isDelivered = true;
    await order.save();
    res.status(200).json({ message: "Order delivered successfully" });
  } catch (error) {
    return res.status(400).json({ message: "Cannot deliver order 🤕" });
  }
});

module.exports = router;
