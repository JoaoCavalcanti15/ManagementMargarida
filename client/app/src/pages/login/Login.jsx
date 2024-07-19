import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import './Login.css'; // Import the CSS file
import logo from "../images/logo.jpg";

const Login = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    username: "",
    password: "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleError = (err) => {
    toast.error(err, {
      position: "bottom-left",
    });
  };

  const handleSuccess = (msg) => {
    toast.success(msg, {
      position: "bottom-left",
      autoClose: 2000, // Duration in milliseconds (3 seconds)
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/login",
        inputValue,
        { withCredentials: true } // Ensure this matches how your server expects credentials
      );

      console.log(data); // Debugging: log response data to see if token and user are as expected

      const { success, message, token, user } = data;
      if (success) {
        localStorage.setItem("token", token);
        handleSuccess(message);

        setTimeout(() => {
          if (user.isAdmin) {
            navigate("/rental-insertion");
          } else {
            navigate("/dashboard");
          }
        }, 2000);
      } else {
        handleError(message);
      }
    } catch (error) {
      console.error('Error during login request:', error);
      handleError('Login failed. Please try again.');
    }
    setInputValue({
      username: "",
      password: "",
    });
  };

  return (
    <div className="form-container">
      <div className="header">
        <img src={logo} alt="Logo" className="logo" />
        <h2 className="page-name">Log In</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            value={inputValue.username}
            onChange={handleOnChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={inputValue.password}
            onChange={handleOnChange}
          />
        </div>
        <button type="submit">Submit</button>
        <button type="button" onClick={() => navigate("/signup")}>Sign Up</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;