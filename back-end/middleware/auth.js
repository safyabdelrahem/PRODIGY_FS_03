const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  const { token } = req.headers;

  if (!token) {
    return res.status(401).json({ success: false, message: "Not Authorized, please login again" });
  }

  try {

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    
   req.body.userId=token_decode.id

  
    next();
  } catch (error) {
 
    return res.status(401).json({ success: false, message: "Invalid token, authorization denied" });
  }
};

module.exports = { authMiddleware };
