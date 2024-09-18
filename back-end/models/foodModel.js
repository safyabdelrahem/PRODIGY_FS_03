const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true }, // Assuming this should be a String for the image path
    category: { type: String, required: true } // Changed to String assuming categories are text-based
});

const foodModel = mongoose.models.food || mongoose.model("food", foodSchema);

module.exports = foodModel;
