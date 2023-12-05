// Filter.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../images/logo.jpg";
import "./Filter.css"; // Import the CSS file

const Filter = () => {
  const navigate = useNavigate();

  // Handler for navigating back to the dashboard
  const goToDashboard = () => {
    navigate("/dashboard");
  };

  return (
    <>
      <div className="header">
        <img src={logo} alt="Logo" className="logo" />
        <button className="dashboard-button" onClick={goToDashboard}>
          Dashboard
        </button>
      </div>
      <div className="filter-container">
        <h2>Filtro de tarefas na Base de Dados</h2>
        <div>
          <label htmlFor="clientName">Client Name:</label>
          <input type="text" id="clientName" name="clientName" />
        </div>
        <div>
          <label htmlFor="inflatable">Inflatable:</label>
          <input type="text" id="inflatable" name="inflatable" />
        </div>
        <div>
          <label htmlFor="date">Date:</label>
          <input type="date" id="date" name="date" />
        </div>
      </div>
    </>
  );
};

export default Filter;
