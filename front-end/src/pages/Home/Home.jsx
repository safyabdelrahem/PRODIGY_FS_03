
import { useState } from 'react'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import Header from '../../components/Header/Header'
import './Home.css'
import FootCategory from '../../components/FoodCategory/FootCategory'
import AppDownload from '../../components/AppDownload/AppDownload'
const Home = () => {
    const [category,setcategory]=useState("All")
  return (
  
    <div>
        <Header/>
        <ExploreMenu category={category} setcategory={setcategory}/>
        <FootCategory category={category} />
        <AppDownload/>
    </div>
  )
}

export default Home