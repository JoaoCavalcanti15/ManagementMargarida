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