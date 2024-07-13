import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css'; // Import your CSS file for styling
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [inflatables, setInflatables] = useState([]);

  useEffect(() => {
    const fetchInflatables = async () => {
      try {
        const response = await axios.get('http://localhost:4000/inflatables');
        setInflatables(response.data);
      } catch (error) {
        console.error('Error fetching inflatables:', error);
      }
    };

    fetchInflatables();
  }, []);

  const handleChangeState = async (inflatableId) => {
    try {
      console.log('Changing state for inflatableId:', inflatableId);
      const response = await axios.patch(`http://localhost:4000/inflatable/${inflatableId}/change-state`);
      console.log('Response from server:', response.data);
  
      // Update local state with the updated inflatable
      const updatedInflatable = response.data;
      setInflatables(inflatables.map(inflatable => {
        if (inflatable._id === updatedInflatable._id) {
          return { ...inflatable, state: updatedInflatable.state };
        }
        return inflatable;
      }));
    } catch (error) {
      console.error('Error changing state:', error);
    }
  };

  // Handler for navigating to the login page
  const goToLogin = () => {
    navigate("/");
  };


  return (
    <div className="dashboard">
      <div className="header">
        <h2 className="dashboard-title">Inflatables</h2>
        <button className="logout-button" onClick={goToLogin}>
            Log Out
        </button>
      </div>
      <ul className="inflatable-list">
        {inflatables.map((inflatable) => (
          <li key={inflatable._id} className="inflatable-item">
            <h3>{inflatable.name}</h3>
            <p><strong>State:</strong> {inflatable.state}</p>
            <button onClick={() => handleChangeState(inflatable._id)}>Change State</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;