import  { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const StoreContext = createContext();

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState("");
  const [food_list, setFoodList] = useState([]);
  const url = "http://localhost:4000";

  const addToCart = async (itemId) => {
  
    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));
  
   
    if (token) {
      try {

        await axios.post(
          url + "/api/cart/add", 
          { itemId }, 
          { headers: { token } }
        );
      } catch (error) {
        console.error("Error adding to cart:", error);
      }
    }
  };
  

  const removeFromCart = async (itemId) => {
 
    setCartItems((prev) => {
      const updatedCart = { ...prev };
      if (updatedCart[itemId] > 1) {
        updatedCart[itemId] -= 1;
      } else {
        delete updatedCart[itemId];
      }
      return updatedCart;
    });
  
 
    if (token) {
      try {
       
        await axios.post(
          url + "/api/cart/remove", 
          { itemId },
          { headers: { token } } 
        );
      } catch (error) {
        console.error("Error removing from cart:", error);
      }
    }
  };

  const loadCartData = async (token) => {
    try {
      const response = await axios.post(url + "/api/cart/get", {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCartItems(response.data.cartData);
    } catch (error) {
      console.error("Error loading cart data:", error);
    }
  };
  
  
  

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        totalAmount += itemInfo.price * cartItems[item];
      }
    }
    return totalAmount;
  };

  const fetchFoodList = async () => {
    const response = await axios.get(`${url}/api/food/list`);
    setFoodList(response.data.data);
  };

  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        setToken(storedToken);
        await loadCartData(storedToken);  // Pass the token here
      } else {
        console.error("No token found, redirect to login.");
      }
    }
    loadData();
  }, []);
  

  const constValue = {
    food_list,
    removeFromCart,
    addToCart,
    cartItems,
    setCartItems,
    getTotalCartAmount,
    token,
    setToken,
    url,
    setFoodList,
    fetchFoodList,
   
  };

  return (
    <StoreContext.Provider value={constValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;

