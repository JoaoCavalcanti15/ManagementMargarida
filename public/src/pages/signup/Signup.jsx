import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import './Signup.css'; 
import logo from "../images/logo.jpg";

const SignUp = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    username: "",
    password: "",
    isAdmin: false
  });

  const handleOnChange = (e) => {
    const { name, value, type, checked } = e.target;
    setInputValue({
      ...inputValue,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleError = (err) => {
    console.error(err);
    toast.error(err, {
      position: "bottom-left",
    });
  };

  const handleSuccess = (msg) => {
    toast.success(msg, {
      position: "bottom-left",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/signup`,
        inputValue
      );
  
      const { success, message, user } = data;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          if (user.isAdmin) {
            navigate("/rental-insertion");
          } else {
            navigate("/dashboard");
          }
        }, 1000);
      } else {
        handleError(message);
      }
    } catch (error) {
      console.error('Error during signup request:', error);
      handleError('Sign up failed. Please try again.');
    }
    setInputValue({
      username: "",
      password: "",
      isAdmin: false
    });
  };

  return (
    <div className="form-container">
      <div className="header">
        <img src={logo} alt="Logo" className="logo" />
        <h2 className="page-name">Sign Up</h2>
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
        <div>
          <label htmlFor="isAdmin">
            <input
              type="checkbox"
              name="isAdmin"
              checked={inputValue.isAdmin}
              onChange={handleOnChange}
            />
            Sign up as admin
          </label>
        </div>
        <button type="submit">Submit</button>
        <button type="button" onClick={() => navigate("/")}>Go to Login</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default SignUp;