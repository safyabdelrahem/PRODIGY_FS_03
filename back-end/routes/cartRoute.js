const express = require("express");
const { getCart, removeFromCart,addToCart } = require("../controllers/cartControllers.js");
const {authMiddleware}=require("../middleware/auth.js")

const cartRouter = express.Router();

//Routes
cartRouter.post("/add",authMiddleware,addToCart)
cartRouter.post("/remove",authMiddleware,removeFromCart)
cartRouter.post("/get",authMiddleware,getCart)

// Export the router
module.exports = cartRouter;
