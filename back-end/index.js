const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db.js");
const dotenv = require("dotenv");
const foodRouter = require("./routes/foodRoute.js");  
const userRouter = require("./routes/userRoute.js");  // Use CommonJS require
const cartRouter = require("./routes/cartRoute.js");
const orderRouter = require("./routes/orderRoute.js");

// Load environment variables
dotenv.config();

// App config
const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(cors());
app.use("/images", express.static('uploads'));

// DB connection
connectDB();

// API endpoints
app.use("/api/food", foodRouter);  
app.use("/api/user", userRouter);
app.use("/api/cart",cartRouter);
app.use("/api/order",orderRouter)

app.get("/", (req, res) => {
  res.send("API WORKING");
});

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
