import { assets } from '../../assets/frontend_assets/assets'
import './Footer.css'

function Footer() {
  return (
    <div className='footer' id='footer'>
      <div className="footer-content">
        <div className="footer-content-left">
         <img src={assets.logo} alt="" />
         <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Id deserunt vero deleniti nihil ipsum, officia accusantium error. Quasi dicta inventore vero, unde quos laboriosam, alias debitis quibusdam eaque error illum.</p>
         <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="" />
            <img src={assets.twitter_icon} alt="" />
            <img src={assets.linkedin_icon} alt="" />
         </div>
        </div>
        <div className="footer-content-center">
            <h2>COMPANY</h2>
            <ul>
                <li>HOME</li>
                <li>ABOUT US</li>
                <li>DELIVERY</li>
                <li>PRIVACY POLICY</li>
            </ul>
            </div>
        <div className="footer-content-right">
       <h2>GET IN TOUCH</h2>
      <ul>
        <li>01145951738</li>
        <li>safynazabdelraheem@gmail.com</li>
      </ul>
        </div>
       
      </div>
      <hr />
      <p className='footer-copyright'>Copyright 2024 @ Safy.com - All Rights Reserved.</p>
    </div>
  )
}

export default Footer
