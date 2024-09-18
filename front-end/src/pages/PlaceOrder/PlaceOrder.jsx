import { useContext, useState } from 'react';
import axios from 'axios'; // Import axios
import './PlaceOrder.css';
import { StoreContext } from '../../Context/ShareContext';

function PlaceOrder() {
  const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  });

  // Handler for input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Prepare order items
    let orderItems = food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        return {
          ...item,
          quantity: cartItems[item._id],
        };
      }
      return null;
    }).filter(item => item !== null);
    
    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2,
    };

    try {
      // Send order data to the backend
      const response = await axios.post(`${url}/api/order/place`, orderData, {
        headers: {
          'Authorization': `Bearer ${token}`, // If you need to send a token
          'Content-Type': 'application/json'
        }
        
      });
      
      // Handle successful response
      console.log('Order placed successfully:', response.data);
      // Optionally redirect or show a success message
      window.location.href = response.data.session_url; // Redirect to payment page
    } catch (error) {
      console.error('Error placing order:', error);
      // Handle error (e.g., show an error message)
    }
  };

  return (
    <form className='place-order' onSubmit={handleSubmit}>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input 
            type="text" 
            name="firstName" 
            value={data.firstName} 
            onChange={handleChange} 
            placeholder='First name' 
          />
          <input 
            type="text" 
            name="lastName" 
            value={data.lastName} 
            onChange={handleChange} 
            placeholder='Last name' 
          />
        </div>
        <input 
          type="email" 
          name="email" 
          value={data.email} 
          onChange={handleChange} 
          placeholder='Email address' 
        />
        <input 
          type="text" 
          name="street" 
          value={data.street} 
          onChange={handleChange} 
          placeholder='Street' 
        />
        <div className="multi-fields">
          <input 
            type="text" 
            name="city" 
            value={data.city} 
            onChange={handleChange} 
            placeholder='City' 
          />
          <input 
            type="text" 
            name="state" 
            value={data.state} 
            onChange={handleChange} 
            placeholder='State' 
          />
        </div>
        <div className="multi-fields">
          <input 
            type="text" 
            name="zipcode" 
            value={data.zipcode} 
            onChange={handleChange} 
            placeholder='Zip Code' 
          />
          <input 
            type="text" 
            name="country" 
            value={data.country} 
            onChange={handleChange} 
            placeholder='Country' 
          />
        </div>
        <input 
          type="text" 
          name="phone" 
          value={data.phone} 
          onChange={handleChange} 
          placeholder='Phone' 
        />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div className="cart-total-details">
            <p>Subtotal</p>
            <p>${getTotalCartAmount()}</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <p>Delivery Fee</p>
            <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <b>Total</b>
            <b>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
          </div>
          <button type="submit">PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
}

export default PlaceOrder;
