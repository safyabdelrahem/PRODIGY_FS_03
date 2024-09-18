import { useContext } from 'react'
import './FoodCategory.css'
import { StoreContext } from '../../Context/ShareContext'
import FoodItem from '../FoodItem/FoodItem'

function FootCategory({category}) {
    const {food_list} = useContext(StoreContext)
  return (
    <div className='food-display' id='food-display'>
      <h2>Top dishes near you</h2>
      <div className='food-display-list'>
        {food_list.map((item,index)=>{
         if (category === "All" || category === item.category) {
          return (
              <FoodItem
                  key={index}
                  id={item._id}
                  name={item.name}
                  description={item.description}
                  price={item.price}
                  image={item.image}
              />);
          }
           
        })}
      </div>
    </div>
  )
}

export default FootCategory
