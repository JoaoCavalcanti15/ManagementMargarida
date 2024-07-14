import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles.css"; // Import the CSS file
import logo from "../images/logo.jpg";

const Login = () => {
  const navigate = useNavigate();

  // State to manage input values for username and password
  const [inputValue, setInputValue] = useState({
    username: "",
    password: "",
  });

  // Function to handle input changes
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  // Function to handle error toast messages
  const handleError = (err) => {
    console.error(err);
    toast.error(err, {
      position: "bottom-left",
    });
  };

  // Function to handle success toast messages
  const handleSuccess = (msg) => {
    toast.success(msg, {
      position: "bottom-left",
    });
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send login request to backend
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/login`,
        inputValue
      );

      // Destructure response data
      const { success, message, user } = data;
      if (success) {
        // Handle successful login
        handleSuccess(message);
        setTimeout(() => {
          if (user.isAdmin) {
            // Navigate to admin dashboard if user is admin
            navigate("/rental-insertion");
          } else {
            // Navigate to regular user dashboard
            navigate("/dashboard");
          }
        }, 1000);
      } else {
        // Handle login failure
        handleError(message);
      }
    } catch (error) {
      // Handle network or other errors during login request
      console.error("Error during login request:", error);
      handleError("Login failed. Please try again.");
    }
    // Clear input values after form submission
    setInputValue({
      username: "",
      password: "",
    });
  };

  return (
    <div className="container">
      {/* Header section with logo and page name */}
      <div className="header">
        <img src={logo} alt="Logo" className="logo" />
        <h2 className="page-name">Log In</h2>
      </div>
      {/* Login form */}
      <form id="formulario" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={inputValue.username}
            onChange={handleOnChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={inputValue.password}
            onChange={handleOnChange}
          />
        </div>
        {/* Submit button */}
        <button type="submit" className="button">
          Submit
        </button>
      </form>
      {/* Toast notifications container */}
      <ToastContainer />
    </div>
  );
};

export default Login;
