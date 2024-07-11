import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../images/logo.jpg";
import { ToastContainer, toast } from "react-toastify";
import './RentalInsertion.css'; // Import the CSS file

import "react-toastify/dist/ReactToastify.css";

const RentalInsertion = () => {
  const navigate = useNavigate();

  // State for rental information and errors
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

  // State for individual input field errors
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

  // State to store existing inflatables fetched from backend
  const [inflatables, setInflatables] = useState([]);

  // Fetch existing inflatables from backend when component mounts
  useEffect(() => {
    const fetchInflatables = async () => {
      try {
        const response = await axios.get("http://localhost:4000/inflatables");
        setInflatables(response.data);
      } catch (error) {
        console.error("Error fetching inflatables:", error);
      }
    };

    fetchInflatables();
  }, []);

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    // Update the rental info
    let newRentalInfo = { ...rentalInfo, [name]: value };

    // Validate the field and set errors
    let newErrors = { ...errors };
    if (value.trim() === "") {
        newErrors[name] = `${name} is required`;
    } else {
        delete newErrors[name];
    }

    setRentalInfo(newRentalInfo);
    setErrors(newErrors);
  };

  // Handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if all required fields are filled
    let newErrors = {};
    if (!rentalInfo.name) newErrors.name = "Name is required";
    if (!rentalInfo.address) newErrors.address = "Address is required";
    if (!rentalInfo.email) newErrors.email = "Email is required";
    if (!rentalInfo.phonenumber) newErrors.phonenumber = "Phone number is required";
    if (!rentalInfo.deliverytime) newErrors.deliverytime = "Delivery time is required";
    if (!rentalInfo.pickuptime) newErrors.pickuptime = "Pickup time is required";
    if (!rentalInfo.inflatable) newErrors.inflatable = "Inflatable is required";
    if (!rentalInfo.price) newErrors.price = "Price is required";
    if (!rentalInfo.nif) newErrors.nif = "NIF is required";
    if (!rentalInfo.paymentmethod) newErrors.paymentmethod = "Payment method is required";

    setErrors(newErrors);

    // If there are errors, do not proceed with form submission
    if (Object.keys(newErrors).length > 0) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:4000/rental",
        rentalInfo
      );
      console.log("Rental created:", response.data);
      toast.success("Rental created successfully");
      setTimeout(() => {
        navigate("/rental-insertion");
      }, 1000);
    } catch (error) {
      console.error("Error creating rental:", error.response.data);
      toast.error("Error creating rental. Please try again.");

      // Update errors state based on backend validation errors
      if (error.response.data.errors) {
        const apiErrors = error.response.data.errors;
        const fieldErrors = {};
        Object.keys(apiErrors).forEach((key) => {
          fieldErrors[key] = apiErrors[key].message;
        });
        setErrors(fieldErrors);
      }
    }
  };

  return (
    <>
      <div className="header">
        <img src={logo} alt="Logo" className="logo" />
        <button className="filter-button" onClick={() => navigate("/filter")}>
          Filters
        </button>
      </div>
      <div className="rental-container">
        <div className="form-container">
          <h2>Rental Insertion Form</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name">Client Name</label>
              <input
                type="text"
                name="name"
                value={rentalInfo.name}
                onChange={handleOnChange}
              />
              {errors.name && <p className="error">{errors.name}</p>}
            </div>
            <div>
              <label htmlFor="address">Address</label>
              <input
                type="text"
                name="address"
                value={rentalInfo.address}
                onChange={handleOnChange}
              />
              {errors.address && <p className="error">{errors.address}</p>}
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                value={rentalInfo.email}
                onChange={handleOnChange}
              />
              {errors.email && <p className="error">{errors.email}</p>}
            </div>
            <div>
              <label htmlFor="phoneNumber">Mobile Number</label>
              <input
                type="number"
                name="phonenumber"
                value={rentalInfo.phonenumber}
                onChange={handleOnChange}
              />
              {errors.phonenumber && <p className="error">{errors.phonenumber}</p>}
            </div>
            <div>
              <label htmlFor="deliverytime">Delivery Time</label>
              <input
                type="datetime-local"
                name="deliverytime"
                value={rentalInfo.deliverytime}
                onChange={handleOnChange}
              />
              {errors.deliverytime && <p className="error">{errors.deliverytime}</p>}
            </div>
            <div>
              <label htmlFor="pickuptime">Pickup Time</label>
              <input
                type="datetime-local"
                name="pickuptime"
                value={rentalInfo.pickuptime}
                onChange={handleOnChange}
              />
              {errors.pickuptime && <p className="error">{errors.pickuptime}</p>}
            </div>
            <div>
              <label htmlFor="inflatable">Inflatable</label>
              <select
                name="inflatable"
                value={rentalInfo.inflatable}
                onChange={handleOnChange}
              >
                <option value="">Select an inflatable</option>
                {inflatables.map((inflatable) => (
                  <option key={inflatable._id} value={inflatable._id}>
                    {inflatable.name}
                  </option>
                ))}
              </select>
              {errors.inflatable && <p className="error">{errors.inflatable}</p>}
            </div>
            <div>
              <label htmlFor="price">Price</label>
              <input
                type="number"
                name="price"
                value={rentalInfo.price}
                onChange={handleOnChange}
              />
              {errors.price && <p className="error">{errors.price}</p>}
            </div>
            <div>
              <label htmlFor="nif">NIF</label>
              <input
                type="number"
                name="nif"
                value={rentalInfo.nif}
                onChange={handleOnChange}
              />
              {errors.nif && <p className="error">{errors.nif}</p>}
            </div>
            <div>
              <label htmlFor="paymentmethod">Payment Method</label>
              <select
                name="paymentmethod"
                value={rentalInfo.paymentmethod}
                onChange={handleOnChange}
              >
                <option value="">Select payment method</option>
                <option value="Transferência">Transferência</option>
                <option value="Dinheiro">Dinheiro</option>
                <option value="MB Way">MB Way</option>
              </select>
              {errors.paymentmethod && <p className="error">{errors.paymentmethod}</p>}
            </div>
            <button type="submit" className="submit-button">
              Submit Rental
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default RentalInsertion;