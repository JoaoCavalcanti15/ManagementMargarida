// Assuming this is part of a React component
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../images/logo.jpg";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Dashboard = () => {
  const navigate = useNavigate();

  // State for rental information
  const [rentalInfo, setRentalInfo] = useState({
    name: "",
    address: "",
    email: "",
    phoneNumber: "",
    deliverTime: "",
    pickupTime: "",
    inflatable: "",
    price: 0,
    nif: "",
    paymentMethod: "",
  });

  // Handler for input changes
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setRentalInfo({
      ...rentalInfo,
      [name]: value,
    });
  };

  // Handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
  };

  return (
    <>
      <div className="header">
        <img src={logo} alt="Logo" className="logo" />
        <button className="filter-button" onClick={() => navigate("/filter")}>
          Filters
        </button>
      </div>
      <div className="dashboard-container">
        <div className="form-container">
          <h2>Inserção de tarefas na Base de Dados</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name">Client Name</label>
              <input
                type="text"
                name="name"
                value={rentalInfo.name}
                onChange={handleOnChange}
              />
            </div>
            <div>
              <label htmlFor="address">Address</label>
              <input
                type="text"
                name="address"
                value={rentalInfo.address}
                onChange={handleOnChange}
              />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                value={rentalInfo.email}
                onChange={handleOnChange}
              />
            </div>
            <div>
              <label htmlFor="phoneNumber">Mobile Number</label>
              <input
                type="tel"
                name="phoneNumber"
                value={rentalInfo.phoneNumber}
                onChange={handleOnChange}
              />
            </div>
            <div>
              <label htmlFor="deliverTime">Delivery Time</label>
              <input
                type="datetime-local"
                name="deliverTime"
                value={rentalInfo.deliverTime}
                onChange={handleOnChange}
              />
            </div>
            <div>
              <label htmlFor="pickupTime">Pickup Time</label>
              <input
                type="datetime-local"
                name="pickupTime"
                value={rentalInfo.pickupTime}
                onChange={handleOnChange}
              />
            </div>
            <div>
              <label htmlFor="inflatable">Inflatable</label>
              <input
                type="text"
                name="inflatable"
                value={rentalInfo.inflatable}
                onChange={handleOnChange}
              />
            </div>
            <div>
              <label htmlFor="price">Price</label>
              <input
                type="number"
                name="price"
                value={rentalInfo.price}
                onChange={handleOnChange}
              />
            </div>
            <div>
              <label htmlFor="nif">NIF</label>
              <input
                type="number"
                name="nif"
                value={rentalInfo.nif}
                onChange={handleOnChange}
              />
            </div>
            <div>
              <label htmlFor="paymentMethod">Payment Method</label>
              <select
                name="paymentMethod"
                value={rentalInfo.paymentMethod}
                onChange={handleOnChange}
              >
                <option value="">Select payment method</option>
                <option value="Transferência">Transferência</option>
                <option value="Dinheiro">Dinheiro</option>
                <option value="MB Way">MB Way</option>
              </select>
            </div>
            <button type="submit">Submit Rental</button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Dashboard;
