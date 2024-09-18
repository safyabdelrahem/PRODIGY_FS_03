import './Header.css'
import headerImg from '../../assets/frontend_assets/header_img.png';

function Header() {
    return (
      <div
        className="header"
        style={{
          backgroundImage: `url(${headerImg})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'contain'
        }}
      >
        <div className="header-contents">
          <h2>Order your favourite food here</h2>
          <p>Choose from a diverse menu featuring a delectable array of dishes crafted with the finest ingredients and culinary. Our delicious meal at a time</p>
          <button>View Menu</button>
        </div>
      </div>
    );
  }
  
export default Header
