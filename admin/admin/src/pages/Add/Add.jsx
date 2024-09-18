import "./Add.css";
import { assets } from '../../assets/assets.js';
import { useState } from "react";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Add({url}) {
  
  const [image, setImage] = useState(null);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: ""
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }));
  };

  const onImageChange = (event) => {
    if (event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    // Create a FormData object to handle file upload
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("category", data.category);
    if (image) {
      formData.append("image", image);
    }

    try {
      // Send data to the backend using axios
      const response = await axios.post(`${url}/api/food/add`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });

      console.log('Success:', response.data);
      toast.success('Product added successfully!'); // Success notification

      // Optionally, reset form fields and image
      setData({
        name: "",
        description: "",
        price: "",
        category: ""
      });
      setImage(null);
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to add product. Please try again.'); // Error notification
    }
  };

  return (
    <div className="add">
      <form className="flex-col" onSubmit={onSubmitHandler}>
        <div className="add-img-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt="Upload" />
          </label>
          <input onChange={onImageChange} type="file" id="image" hidden />
        </div>
        <div className="add-product-name flex-col">
          <p>Product name</p>
          <input onChange={onChangeHandler} value={data.name} type="text" name="name" placeholder="type here" />
        </div>
        <div className="add-product-description flex-col">
          <p>Product Description</p>
          <textarea onChange={onChangeHandler} name="description" value={data.description} rows="6" placeholder="Write content here"></textarea>
        </div>
        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product Category</p>
            <select onChange={onChangeHandler} name="category" value={data.category}>
              <option value="">Select Category</option>
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>
          <div className="add-price">
            <p>Product Price</p>
            <input onChange={onChangeHandler} type="number" name="price" value={data.price} placeholder="$20" />
          </div>
        </div>
        <button type="submit" className="add-btn">ADD</button>
      </form>
      <ToastContainer /> {/* Add ToastContainer to the component */}
    </div>
  );
}

export default Add;
