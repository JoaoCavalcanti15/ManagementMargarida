import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Login.css";
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

  const handleError = (err) =>
    toast.error(err, {
      position: "bottom-left",
    });
  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "bottom-left",
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password } = inputValue;

    // Hardcoded credentials (replace with your actual credentials)
    const hardcodedUsername = "margarida";
    const hardcodedPassword = "margarida123";

    if (username === hardcodedUsername && password === hardcodedPassword) {
      handleSuccess("Login successful!"); // Simulate success
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } else {
      handleError("Invalid credentials"); // Simulate error
    }

    setInputValue({
      ...inputValue,
      username: "",
      password: "",
    });
  };

  return (
    <div className="form-container">
      <div className="header">
        <img src={logo} alt="Logo" className="logo" />
      </div>
      <h2>Login Account</h2>
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
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;
