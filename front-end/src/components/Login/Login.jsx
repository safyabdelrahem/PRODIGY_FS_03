// Login.js
import { useState, useContext } from 'react';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../../Context/AuthContext.jsx';
import './Login.css';
import { assets } from '../../assets/frontend_assets/assets';

export default function Login({ setShowLogin }) {
    const [currState, setCurrState] = useState("Login");
    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    });
    const { login } = useContext(AuthContext);

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            let response;
            if (currState === "Login") {
                response = await axios.post('http://localhost:4000/api/user/login', {
                    email: data.email,
                    password: data.password
                }, config);
                toast.success("Login successful!");
                login(response.data.token); // Set token and update context
            } else {
                response = await axios.post('http://localhost:4000/api/user/register', {
                    name: data.name,
                    email: data.email,
                    password: data.password
                }, config);
                toast.success("Registration successful!");
                login(response.data.token); // Set token and update context
            }
            setShowLogin(false); // Hide the form
        } catch (error) {
            toast.error("Error during form submission");
            console.error("Error during form submission", error.response ? error.response.data : error);
        }
    };

    return (
        <div className='login-popup'>
            <ToastContainer />
            <div className="login-popup-container">
                <div className="login-popup-title">
                    <h2>{currState}</h2>
                    <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="Close" />
                </div>
                <form onSubmit={handleSubmit} className="login-popup-inputs">
                    {currState === "Sign Up" && 
                        <input 
                            type="text" 
                            name="name"
                            placeholder='Your name' 
                            value={data.name}
                            onChange={onChangeHandler} 
                            required 
                        />
                    }
                    <input 
                        type="email" 
                        name="email"
                        placeholder='Your email' 
                        value={data.email}
                        onChange={onChangeHandler} 
                        required 
                    />
                    <input 
                        type="password" 
                        name="password"
                        placeholder='Password' 
                        value={data.password}
                        onChange={onChangeHandler} 
                        required 
                    />
                    <button type="submit">{currState === "Sign Up" ? "Create account" : "Login"}</button>
                    <div className='login-popup-condition'>
                        <input type="checkbox" required />
                        <p>By continuing, I agree to the terms of use & privacy policy.</p>
                    </div>
                </form>
                <p>
                    {currState === "Login"
                        ? "Create a new account? "
                        : "Already have an account? "}
                    <span onClick={() => setCurrState(currState === "Login" ? "Sign Up" : "Login")}>
                        {currState === "Login" ? "Click here" : "Login here"}
                    </span>
                </p>
            </div>
        </div>
    );
}
