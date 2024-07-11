const Rental = require('../Models/RentalModel');

module.exports.Rental = async (req, res, next) => {
  try {
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

    // Check if a rental with the same attributes already exists
    const existingRental = await Rental.findOne({
      name,
      nif
    });

    if (existingRental) {
      return res.json({ message: "Rental already exists" });
    }

    // Parse dates from strings into Date objects
    const deliveryDate = new Date(deliverytime);
    const pickupDate = new Date(pickuptime);

    // Create a new rental instance
    const newRental = new Rental({
      name,
      address,
      email,
      phonenumber,  // Ensure phoneNumber is a number
      deliverytime: deliveryDate,           // Use parsed Date object
      pickuptime: pickupDate,              // Use parsed Date object
      inflatable,
      price,
      nif,
      paymentmethod
    });

    // Save rental to database
    const savedRental = await newRental.save();

    // Respond with success message and saved rental object
    res.status(201).json({ message: "Rental created successfully", success: true, rental: savedRental });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};

exports.getFilteredRentals = async (req, res) => {
  try {
    const { name, inflatableName } = req.query;
    let filter = {};

    if (inflatableName) {
      // Find the inflatable by name to get its ID
      const inflatable = await Inflatable.findOne({ name: inflatableName });
      if (!inflatable) {
        return res.status(404).json({ error: "Inflatable not found" });
      }
      filter.inflatable = inflatable._id;
    }

    if (name) {
      // Filter by rental name
      filter.name = name;
    }

    // Query rentals based on the filter
    const rentals = await Rental.find(filter);

    res.status(200).json(rentals);
  } catch (error) {
    console.error("Error fetching filtered rentals:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};