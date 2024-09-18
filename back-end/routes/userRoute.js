const express = require("express");
const { registerUser, loginUser } = require("../controllers/userController.js");

const userRouter = express.Router();

// Routes
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);

// Export the router
module.exports = userRouter;
