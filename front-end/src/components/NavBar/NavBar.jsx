import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';  
import { StoreContext } from '../../Context/ShareContext';
import './NavBar.css';
import { assets } from '../../assets/frontend_assets/assets';

const NavBar = ({ setShowLogin }) => {
    const [menu, setMenu] = useState("menu");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const { getTotalCartAmount } = useContext(StoreContext);

    const checkToken = () => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);
    };

    useEffect(() => {
        checkToken();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false); // Update state to show the login button
    };

    const handleSignInClick = () => {
        setShowLogin(true);
    };

    const updateLoginStatus = () => {
        checkToken(); // Refresh the login status
    };

    return (
        <div className='navbar'>
            <img src={assets.logo} alt='this is a logo' className='logo' />
            <ul className="navbar-menu">
                <li onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>
                    <Link to="/">home</Link>  
                </li>
                <li onClick={() => setMenu("menu")} className={menu === "menu" ? "active" : ""}>
                    <Link to="/menu">menu</Link>
                </li>
                <li onClick={() => setMenu("mobile-app")} className={menu === "mobile-app" ? "active" : ""}>
                    <Link to="/mobile-app">mobile-app</Link>
                </li>
                <li onClick={() => setMenu("contact us")} className={menu === "contact us" ? "active" : ""}>
                    <Link to="/contact">contact us</Link>
                </li>
            </ul>
            <div className="navbar-right">
                <img src={assets.search_icon} alt="" />
                <div className="navbar-search-icon">
                    <Link to="/cart"><img src={assets.basket_icon} alt="" /></Link>   
                    <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
                </div>
                {isLoggedIn ? (
                    <div className="profile-container">
                        <img src={assets.profile_icon} alt="Profile" className="profile-picture" />
                        <ul className='nav-profile-dropdown'>
<li><img src={assets.bag_icon} alt="" /><p >Orders</p></li>
<hr />
<li onClick={handleLogout}><img src={assets.logout_icon} alt="" /><p >logout</p></li>
                        </ul>
                        {/* <button onClick={handleLogout}>Logout</button> */}
                    </div>
                ) : (
                    <button onClick={handleSignInClick}>Sign in</button>
                )}
            </div>
        </div>
    );
}

export default NavBar;
