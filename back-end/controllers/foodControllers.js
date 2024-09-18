const foodModel = require("../models/foodModel");
const fs = require('fs');

// Add food item
const addFood = async (req, res) => {
  try {
    // Get image file name from multer
    const image_filename = req.file ? req.file.filename : null;

    // Destructure the fields from req.body
    const { name, description, price, category } = req.body;

    // Create a new food item with the given details
    const food = new foodModel({
      name,
      description,
      price,
      category,
      image: image_filename // Store the image filename in the database
    });

    // Save the new food item to the database
    await food.save();

    // Send success response
    res.status(201).json({
      success: true,
      message: 'Food item added successfully',
      food
    });
  } catch (error) {
    console.error('Error adding food item:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to add food item',
      error: error.message
    });
  }
};


// all food list 
const listFood=async(req,res)=>{
try {
    const foods = await foodModel.find({});
    res.json({success:true,data:foods})
} catch (error) {
    console.log(error);
    res.json({success:false,message:"Error"})
    
}
}

// remove food item

const removeFood = async(req,res)=>{
try {
    const food = await foodModel.findById(req.body.id);
    fs.unlink(`uploads/${food.image}`,()=>{})
    await foodModel.findByIdAndDelete(req.body.id);
    res.json({success:true,message:"Food Removed"})
} catch (error) {
    console.log(error);
    res.json({success:false,message:"Error"})
}
}

module.exports = { addFood,listFood,removeFood };
