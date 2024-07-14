import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import '../styles.css'; // Import common styles

const Dashboard = () => {
  const navigate = useNavigate();

  // State to store the list of inflatables
  const [inflatables, setInflatables] = useState([]);

  // Fetch inflatables data from backend on component mount
  useEffect(() => {
    const fetchInflatables = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/inflatables`);
        setInflatables(response.data); // Update state with fetched data
      } catch (error) {
        console.error('Error fetching inflatables:', error);
      }
    };

    fetchInflatables();
  }, []); // Empty dependency array ensures this effect runs only once after initial render

  // Function to handle changing state of an inflatable
  const handleChangeState = async (inflatableId) => {
    try {
      console.log('Changing state for inflatableId:', inflatableId);
      // Send PATCH request to backend to change inflatable state
      const response = await axios.patch(`${process.env.REACT_APP_BACKEND_URL}/inflatable/${inflatableId}/change-state`);
      console.log('Response from server:', response.data);
  
      // Update local state with the updated inflatable's state
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

  // Function to navigate to Login page
  const goToLogin = () => {
    navigate("/");
  };

  return (
    <div className="container">
      {/* Header section with title and logout button */}
      <div className="header">
        <h2 className="title">Inflatables</h2>
        <button className="button" onClick={goToLogin}>
          Log Out
        </button>
      </div>
      {/* List of inflatables */}
      <ul className="list">
        {/* Map through inflatables and display each inflatable */}
        {inflatables.map((inflatable) => (
          <li key={inflatable._id} className="list-item">
            <h3>{inflatable.name}</h3>
            <p><strong>State:</strong> {inflatable.state}</p>
            {/* Button to change inflatable state */}
            <button className="button" onClick={() => handleChangeState(inflatable._id)}>Change State</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;