import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../images/logo.jpg";
import '../styles.css'; // Import common styles

const Filter = () => {
  const navigate = useNavigate();

  // State variables to manage client name, inflatable, and filtered rentals
  const [clientName, setClientName] = useState("");
  const [inflatable, setInflatable] = useState("");
  const [filteredRentals, setFilteredRentals] = useState([]);

  // Function to navigate to Rental Insertion page
  const goToRentalInsertion = () => {
    navigate("/rental-insertion");
  };

  // Function to navigate to Login page
  const goToLogin = () => {
    navigate("/");
  };

  // Function to handle search based on client name and inflatable
  const handleSearch = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/rental?name=${clientName}&inflatable=${inflatable}`);
      setFilteredRentals(response.data); // Update filtered rentals based on API response
    } catch (error) {
      console.error("Error fetching filtered rentals:", error);
    }
  };

  // Function to reset filters and clear filtered rentals
  const resetFilters = () => {
    setClientName("");
    setInflatable("");
    setFilteredRentals([]);
  };

  return (
    <div className="container">
      {/* Header section with logo and navigation buttons */}
      <div className="header">
        <button className="button" onClick={goToLogin}>
          Log Out
        </button>
        <img src={logo} alt="Logo" className="logo" />
        <button className="button" onClick={goToRentalInsertion}>
          Rental Insertion
        </button>
      </div>
      <div className="form-container">
        {/* Title for filter options */}
        <h2 className="title">Filter Options</h2>
        {/* Form inputs for client name and inflatable */}
        <div className="form-group">
          <label htmlFor="clientName">Client Name:</label>
          <input
            type="text"
            id="clientName"
            name="clientName"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="inflatable">Inflatable:</label>
          <input
            type="text"
            id="inflatable"
            name="inflatable"
            value={inflatable}
            onChange={(e) => setInflatable(e.target.value)}
          />
        </div>
        {/* Button group for search and reset */}
        <div className="button-group">
          <button className="button" onClick={handleSearch}>
            Search
          </button>
          <button className="button" onClick={resetFilters}>
            Reset
          </button>
        </div>
        {/* Display filtered rentals if there are any */}
        {filteredRentals.length > 0 && (
          <div className="list">
            <h3 className="title">Filtered Rentals</h3>
            <ul>
              {/* Map through filtered rentals and display details */}
              {filteredRentals.map((rental) => (
                <li key={rental._id} className="list-item">
                  <strong>Name:</strong> {rental.name}<br />
                  <strong>Address:</strong> {rental.address}<br />
                  <strong>Email:</strong> {rental.email}<br />
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Filter;