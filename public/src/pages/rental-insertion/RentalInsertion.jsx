import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles.css"; // Import common styles
import logo from "../images/logo.jpg";

const RentalInsertion = () => {
  const navigate = useNavigate();

  // State for rental information
  const [rentalInfo, setRentalInfo] = useState({
    name: "",
    address: "",
    email: "",
    phonenumber: "",
    deliverytime: "",
    pickuptime: "",
    inflatable: "",
    price: 0,
    nif: "",
    paymentmethod: "",
  });

  // State for validation errors
  const [errors, setErrors] = useState({
    name: "",
    address: "",
    email: "",
    phonenumber: "",
    deliverytime: "",
    pickuptime: "",
    inflatable: "",
    price: "",
    nif: "",
    paymentmethod: "",
  });

  // State for storing inflatables fetched from the backend
  const [inflatables, setInflatables] = useState([]);

  // Fetch inflatables from backend on component mount
  useEffect(() => {
    const fetchInflatables = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/inflatables`);
        setInflatables(response.data);
      } catch (error) {
        console.error("Error fetching inflatables:", error);
      }
    };

    fetchInflatables();
  }, []);

  // Handle input change and validation
  const handleOnChange = (e) => {
    const { name, value } = e.target;

    // Update rentalInfo state with new value
    let newRentalInfo = { ...rentalInfo, [name]: value };

    // Update errors state based on validation rules
    let newErrors = { ...errors };
    switch (name) {
      case "name":
        newErrors.name = value.length < 5 ? "Name must be 5 characters long!" : "";
        break;
      case "address":
        newErrors.address = value.length < 5 ? "Address must be 5 characters long!" : "";
        break;
      case "email":
        newErrors.email = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(value) ? "" : "Email is not valid!";
        break;
      case "phonenumber":
        newErrors.phonenumber = /^[1-9][0-9]{8}$/.test(value) ? "" : "Phone number is not valid!";
        break;
      case "deliverytime":
        newErrors.deliverytime = value.length < 5 ? "This field is required!" : "";
        break;
      case "pickuptime":
        newErrors.pickuptime = value.length < 5 ? "This field is required!" : "";
        break;
      case "inflatable":
        newErrors.inflatable = value.length < 5 ? "This field is required!" : "";
        break;
      case "price":
        newErrors.price = value.lenght < 2 ? "This field is required!" : "";
        break;
      case "nif":
        newErrors.nif = value.length < 5 ? "This field is required!" : "";
        break;
      case "paymentmethod":
        newErrors.paymentmethod = value.length < 5 ? "This field is required!" : "";
        break;
      default:
        break;
    }

    // Update state with new errors and rentalInfo
    setErrors(newErrors);
    setRentalInfo(newRentalInfo);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send rentalInfo to backend for insertion
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/rental`, rentalInfo);
      toast.success("Rental inserted successfully!");

      // Clear form fields upon successful submission
      setRentalInfo({
        name: "",
        address: "",
        email: "",
        phonenumber: "",
        deliverytime: "",
        pickuptime: "",
        inflatable: "",
        price: 0,
        nif: "",
        paymentmethod: "",
      });

      // Navigate to filter page on success
      navigate("/filter");
    } catch (error) {
      toast.error("Failed to insert rental.");
    }
  };

  // Navigate to login page
  const goToLogin = () => {
    navigate("/");
  };

  // Navigate to filters page
  const goToFilters = () => {
    navigate("/filter");
  };

  return (
    <div className="container">
      <div className="header">
        {/* Button to logout */}
        <button className="button" onClick={goToLogin}>
          Log Out
        </button>
        {/* Logo */}
        <img src={logo} alt="Logo" className="logo" />
        <button className="button" onClick={goToFilters}>
          Filters
        </button>
      </div>
      <div className="form-container">
        {/* Title */}
        <h2 className="title">Rental Insertion</h2>
        <form id="formulario" onSubmit={handleSubmit}>
          {/* Name input */}
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={rentalInfo.name}
              onChange={handleOnChange}
            />
            {errors.name && <p className="error">{errors.name}</p>}
          </div>
          {/* Address input */}
          <div className="form-group">
            <label htmlFor="address">Address:</label>
            <input
              type="text"
              id="address"
              name="address"
              value={rentalInfo.address}
              onChange={handleOnChange}
            />
            {errors.address && <p className="error">{errors.address}</p>}
          </div>
          {/* Email input */}
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={rentalInfo.email}
              onChange={handleOnChange}
            />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>
          {/* Phone number input */}
          <div className="form-group">
            <label htmlFor="phonenumber">Phone Number:</label>
            <input
              type="tel"
              id="phonenumber"
              name="phonenumber"
              value={rentalInfo.phonenumber}
              onChange={handleOnChange}
            />
            {errors.phonenumber && <p className="error">{errors.phonenumber}</p>}
          </div>
          {/* Delivery time input */}
          <div className="form-group">
            <label htmlFor="deliverytime">Delivery Time:</label>
            <input
              type="datetime-local"
              id="deliverytime"
              name="deliverytime"
              value={rentalInfo.deliverytime}
              onChange={handleOnChange}
            />
            {errors.deliverytime && <p className="error">{errors.deliverytime}</p>}
          </div>
          {/* Pickup time input */}
          <div className="form-group">
            <label htmlFor="pickuptime">Pickup Time:</label>
            <input
              type="datetime-local"
              id="pickuptime"
              name="pickuptime"
              value={rentalInfo.pickuptime}
              onChange={handleOnChange}
            />
            {errors.pickuptime && <p className="error">{errors.pickuptime}</p>}
          </div>
          {/* Inflatable selection */}
          <div className="form-group">
            <label htmlFor="inflatable">Inflatable:</label>
            <select
              id="inflatable"
              name="inflatable"
              value={rentalInfo.inflatable}
              onChange={handleOnChange}
            >
              <option value="">Select an inflatable</option>
              {inflatables.map((inflatable) => (
                <option key={inflatable._id} value={inflatable.name}>
                  {inflatable.name}
                </option>
              ))}
            </select>
            {errors.inflatable && <p className="error">{errors.inflatable}</p>}
          </div>
          {/* Price input */}
          <div className="form-group">
            <label htmlFor="price">Price:</label>
            <input
              type="number"
              id="price"
              name="price"
              value={rentalInfo.price}
              onChange={handleOnChange}
            />
            {errors.price && <p className="error">{errors.price}</p>}
          </div>
          {/* NIF input */}
          <div className="form-group">
            <label htmlFor="nif">NIF:</label>
            <input
              type="text"
              id="nif"
              name="nif"
              value={rentalInfo.nif}
              onChange={handleOnChange}
            />
            {errors.nif && <p className="error">{errors.nif}</p>}
          </div>
          {/* Payment method input */}
          <div className="form-group">
            <label htmlFor="paymentmethod">Payment Method:</label>
            <select
              id="paymentmethod"
              name="paymentmethod"
              value={rentalInfo.paymentmethod}
              onChange={handleOnChange}
            >
              <option value="">Select a payment method</option>
              <option value="Dinheiro">Dinheiro</option>
              <option value="Transferência">Transferência</option>
              <option value="MB Way">MB Way</option>
            </select>
            {errors.paymentmethod && <p className="error">{errors.paymentmethod}</p>}
          </div>
          {/* Submit button */}
          <button type="submit" className="button">
            Submit
          </button>
        </form>
        {/* Toast notifications */}
        <ToastContainer />
      </div>
    </div>
  );
};

export default RentalInsertion;





