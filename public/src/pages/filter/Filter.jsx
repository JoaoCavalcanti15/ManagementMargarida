import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../images/logo.jpg";
import "./Filter.css"; // Import the CSS file

const Filter = () => {
  const navigate = useNavigate();
  const [clientName, setClientName] = useState("");
  const [inflatable, setInflatable] = useState("");
  const [filteredRentals, setFilteredRentals] = useState([]);

  // Handler for navigating back to the dashboard
  const goToRentalInsertion = () => {
    navigate("/rental-insertion");
  };

  // Handler for navigating to the login page
  const goToLogin = () => {
    navigate("/");
  };


  // Function to handle search
  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/rental?name=${clientName}&inflatable=${inflatable}`);
      setFilteredRentals(response.data);
    } catch (error) {
      console.error("Error fetching filtered rentals:", error);
      // Handle error as needed
    }
  };

  // Function to reset filters and clear results
  const resetFilters = () => {
    setClientName("");
    setInflatable("");
    setFilteredRentals([]);
  };

  return (
    <div className="filter-page">
      <div className="header">
        <button className="logout-button" onClick={goToLogin}>
          Log Out
        </button>
        <img src={logo} alt="Logo" className="logo" />
        <button className="filter-button" onClick={goToRentalInsertion}>
          Rental Insertion
        </button>
      </div>
      <div className="filter-container">
        <h2>Filter Options</h2>
        <div className="filter-form">
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
          <div className="button-group">
            <button className="search-button" onClick={handleSearch}>
              Search
            </button>
            <button className="reset-button" onClick={resetFilters}>
              Reset
            </button>
          </div>
        </div>
        {/* Display filtered rentals */}
        {filteredRentals.length > 0 && (
          <div className="filtered-results">
            <h3>Filtered Rentals</h3>
            <ul>
              {filteredRentals.map((rental) => (
                <li key={rental._id}>
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