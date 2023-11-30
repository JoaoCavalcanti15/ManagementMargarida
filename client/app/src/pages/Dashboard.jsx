import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const Dashboard = () => {
  // State to manage form input values
  const [rentalInfo, setRentalInfo] = useState({
    clientName: "",
    address: "",
    email: "",
    mobileNumber: "",
    deliveryDate: "",
    deliveryTime: "",
    pickUpTime: "",
    inflatables: [],
    paymentInfo: {
      price: 0,
      method: "",
    },
  });

  // Destructuring rentalInfo for easier access
  const {
    clientName,
    address,
    email,
    mobileNumber,
    deliveryDate,
    deliveryTime,
    pickUpTime
  } = rentalInfo;

  // Handler function for form input changes
  const handleOnChange = (e) => {
    const { name, value } = e.target;

    // Update the corresponding field in rentalInfo
    setRentalInfo({
      ...rentalInfo,
      [name]: value,
    });
  };

  // Handler function for submitting the rental form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make a POST request to save rental information
      const { data } = await axios.post(
        "http://localhost:4000/rentals",
        rentalInfo,
        { withCredentials: true }
      );

      const { success, message } = data;
      if (success) {
        // Show success message
        toast.success(message, {
          position: "bottom-left",
        });

        // Reset form after successful submission
        setRentalInfo({
          clientName: "",
          address: "",
          email: "",
          mobileNumber: "",
          deliveryDate: "",
          deliveryTime: "",
          pickUpTime: "",
          inflatables: [],
          paymentInfo: {
            price: 0,
            method: "",
          },
        });
      } else {
        // Show error message
        toast.error(message, {
          position: "bottom-left",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="dashboard_container">
        <h2>Rental Information Form</h2>
        <form onSubmit={handleSubmit}>
            <div>
            <label htmlFor="clientName">Client Name</label>
            <input
                type="text"
                name="clientName"
                value={clientName}
                placeholder="Enter client's name"
                onChange={handleOnChange}
            />
            </div>
            <div>
            <label htmlFor="address">Address</label>
            <input
                type="text"
                name="address"
                value={address}
                placeholder="Enter address"
                onChange={handleOnChange}
            />
            </div>
            <div>
            <label htmlFor="email">Email</label>
            <input
                type="email"
                name="email"
                value={email}
                placeholder="Enter email"
                onChange={handleOnChange}
            />
            </div>
            <div>
            <label htmlFor="mobileNumber">Mobile Number</label>
            <input
                type="tel"
                name="mobileNumber"
                value={mobileNumber}
                placeholder="Enter mobile number"
                onChange={handleOnChange}
            />
            </div>
            <div>
            <label htmlFor="deliveryDate">Delivery Date</label>
            <input
                type="date"
                name="deliveryDate"
                value={deliveryDate}
                onChange={handleOnChange}
            />
            </div>
            <div>
            <label htmlFor="deliveryTime">Delivery Time</label>
            <input
                type="time"
                name="deliveryTime"
                value={deliveryTime}
                onChange={handleOnChange}
            />
            </div>
            <div>
            <label htmlFor="pickUpTime">Pick-up Time</label>
            <input
                type="time"
                name="pickUpTime"
                value={pickUpTime}
                onChange={handleOnChange}
            />
            </div>
            <button type="submit">Submit Rental</button>
        </form> 
        <ToastContainer />
    </div>

  );
};

export default Dashboard;
