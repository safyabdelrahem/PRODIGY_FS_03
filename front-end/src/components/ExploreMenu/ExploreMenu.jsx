import './ExploreMenu.css';
import { menu_list } from '../../assets/frontend_assets/assets';
import { useEffect } from 'react';

function ExploreMenu({ category, setcategory }) {
  // Ensure that menu_list is available and not empty
  useEffect(() => {
    console.log('Menu List:', menu_list);
    console.log('Current Category:', category);
  }, [category]);

  return (
    <div className='explore-menu' id='explore-menu'>
      <h1>Explore Our Menu</h1>
      <p className='explore-menu-text'>
        Choose from a diverse menu featuring a delectable array of dishes crafted with the finest ingredients and culinary expertise. Our delicious meal at a time.
      </p>

      {/* Check if menu_list has data */}
      {menu_list && menu_list.length > 0 ? (
        <div className='explore-menu-list'>
          {menu_list.map((item, index) => {
            return (
              <div
                onClick={() =>
                  setcategory((prev) => (prev === item.menu_name ? 'All' : item.menu_name))
                }
                key={index}
                className='explore-menu-list-item'
              >
                <img
                  className={category === item.menu_name ? 'active' : ''}
                  src={item.menu_image}
                  alt={item.menu_name}
                />
                <p>{item.menu_name}</p>
              </div>
            );
          })}
        </div>
      ) : (
        <p>No menu items available.</p>
      )}
      <hr />
    </div>
  );
}

export default ExploreMenu;
