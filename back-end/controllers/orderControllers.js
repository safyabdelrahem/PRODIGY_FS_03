const userModel = require("../models/userModel.js");
const orderModel = require("../models/orderMode.js"); // Fixed typo in the filename
const Stripe = require("stripe");
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY); // Correctly initialize Stripe

// Placing user order for frontend
const placeOrder = async (req, res) => {
  const frontend_url = "http://localhost:5173"; // Frontend URL
  try {
    // Create a new order in the database
    const newOrder = new orderModel({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });

    await newOrder.save();
    
    // Clear the user's cart after placing the order
    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

    // Map items to Stripe's line_items format
    const line_items = req.body.items.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100, // Stripe expects the amount in cents/paise
      },
      quantity: item.quantity,
    }));

    // Add delivery charges
    line_items.push({
      price_data: {
        currency: "inr",
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: 2 * 100 * 80, // Example delivery charge (in INR)
      },
      quantity: 1,
    });

    // Create a Stripe session for the payment
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`, // Success URL
      cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`, // Cancel URL
    });

    // Send the session URL to the frontend for redirection to Stripe
    res.json({ success: true, session_url: session.url });

  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ message: "Failed to place order", error });
  }
};

module.exports = { placeOrder };
