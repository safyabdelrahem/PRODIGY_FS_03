const express = require("express");
const {placeOrder } = require("../controllers/orderControllers.js");
const {authMiddleware}=require("../middleware/auth.js")

const orderRouter = express.Router();


// Routes
orderRouter.post("/olace",authMiddleware,placeOrder)

// Export the router
module.exports = orderRouter;