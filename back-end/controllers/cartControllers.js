const userModel = require("../models/userModel.js");

// add items to user cart
const addToCart=async(req,res)=>{
try {
    let userData= await userModel.findById(req.body.userId)
    let cartData = await userData.cartData;
    if(!cartData[req.body.itemId]){
        cartData[req.body.itemId]=1;
    }else{
        cartData[req.body.itemId]+=1
    }
    await userModel.findByIdAndUpdate(req.body.userId,{cartData})
    res.json({success:true,message:"Added To Cart"})
} catch (error) {
    res.json({success:false,message:"Error"})
}
}

// remove items from user cart

const removeFromCart=async(req,res)=>{
try {
    let userData= await userModel.findById(req.body.userId);
    let cartData= await userData.cartData;
    if(cartData[req.body.itemId]>0){
        cartData[req.body.itemId]-=1
    }
    await userModel.findByIdAndUpdate(req.body.userId,{cartData})
    res.json({success:true,message:"Removed From Cart"})
} catch (error) {
    res.json({success:false,message:"Error"})
}
}

// fetch user cart data
const getCart = async (req, res) => {
    try {
      let userData = await userModel.findById(req.body.userId);
      let cartData = userData.cartData;
  
     
      if (!cartData || Object.keys(cartData).length === 0) {
        return res.json({ success: true, message: "Cart is empty", cartData: {} });
      }
  
      res.json({ success: true, cartData });
    } catch (error) {
      res.status(500).json({ success: false, message: "Error fetching cart data" });
    }
  };

module.exports = { getCart, removeFromCart,addToCart };