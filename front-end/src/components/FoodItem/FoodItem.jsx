import React, { useContext } from 'react';
import { assets } from '../../assets/frontend_assets/assets';
import './FoodItem.css';
import { StoreContext } from '../../Context/ShareContext.jsx'

function FoodItem({ id, name, price, description, image }) {
  const { cartItems, addToCart, removeFromCart,url } = useContext(StoreContext);

  return (
    <div className='food-item'>
      <div className='food-item-img-container'>
        <img src={url+"/images/"+image} alt={name} className='food-item-image' />
        {
          !cartItems[id] ? (
            <img
              className='add'
              src={assets.add_icon_white}
              onClick={() => addToCart(id)}
              alt="Add to cart"
            />
          ) : (
            <div className='food-item-counter'>
              <img
                onClick={() => removeFromCart(id)}
                src={assets.remove_icon_red}
                alt="Remove from cart"
              />
              <p>{cartItems[id]}</p>
              <img
                onClick={() => addToCart(id)}
                src={assets.add_icon_green}
                alt="Add more"
              />
            </div>
          )
        }
      </div>
      <div className='food-item-info'>
        <div className='food-item-name-rating'>
          <p>{name}</p>
          <img src={assets.rating_starts} alt="Rating stars" />
        </div>
        <p className='food-item-desc'>{description}</p>
        <p className='food-item-price'>${price}</p>
      </div>
    </div>
  );
}

export default FoodItem;
