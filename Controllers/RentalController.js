// Importing the Rental model
const Rental = require('../Models/RentalModel');

// Function to create a new rental
module.exports.Rental = async (req, res, next) => {
  try {
    // Extracting rental details from request body
    const {
      name,
      address,
      email,
      phonenumber,
      deliverytime,
      pickuptime,
      inflatable,
      price,
      nif,
      paymentmethod
    } = req.body;

    // Check if a rental with the same name and NIF already exists
    const existingRental = await Rental.findOne({ name, nif });
    if (existingRental) {
      // If rental already exists, send a response with message
      return res.json({ message: "Rental already exists" });
    }

    // Parse delivery and pickup times from strings into Date objects
    const deliveryDate = new Date(deliverytime);
    const pickupDate = new Date(pickuptime);

    // Create a new rental instance with provided details
    const newRental = new Rental({
      name,
      address,
      email,
      phonenumber,  // Ensure phoneNumber is a number
      deliverytime: deliveryDate,  // Use parsed Date object
      pickuptime: pickupDate,  // Use parsed Date object
      inflatable,
      price,
      nif,
      paymentmethod
    });

    // Save the new rental to the database
    const savedRental = await newRental.save();

    // Respond with success message and saved rental object
    res.status(201).json({ message: "Rental created successfully", success: true, rental: savedRental });
  } catch (error) {
    // Logging the error and sending an error response
    console.error(error);
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};

// Function to get rentals based on filters
exports.getFilteredRentals = async (req, res) => {
  try {
    // Extracting filter parameters from query string
    const { name, inflatableName } = req.query;
    let filter = {};

    if (inflatableName) {
      // Find the inflatable by name to get its ID
      const inflatable = await Inflatable.findOne({ name: inflatableName });
      if (!inflatable) {
        // If inflatable not found, send a not found response
        return res.status(404).json({ error: "Inflatable not found" });
      }
      // Add inflatable ID to filter
      filter.inflatable = inflatable._id;
    }

    if (name) {
      // Add rental name to filter
      filter.name = name;
    }

    // Query rentals based on the filter
    const rentals = await Rental.find(filter);

    // Respond with the filtered rentals
    res.status(200).json(rentals);
  } catch (error) {
    // Logging the error and sending an error response
    console.error("Error fetching filtered rentals:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};