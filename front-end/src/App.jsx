
import { Route, Routes } from "react-router-dom"
import NavBar from "./components/NavBar/NavBar"
import Home from "./pages/Home/Home"
import Cart from "./pages/Cart/Cart"
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder"
import Footer from "./components/Footer/Footer"
import { useState } from "react"
import Login from "./components/Login/Login"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './Context/AuthContext.jsx';

function App() {
const [showLogin,setShowLogin]=useState(false)

  return (
  <>
     <AuthProvider>
  <ToastContainer/>
  {showLogin?<Login setShowLogin={setShowLogin}/>:<></>}
    <div className="app">
     <NavBar setShowLogin={setShowLogin}/>
     <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/cart" element={<Cart/>}/>
      <Route path="/order" element={<PlaceOrder/>}/>
     </Routes>
    </div>
    <Footer/>
    </AuthProvider>
  </>
  )
}

export default App
