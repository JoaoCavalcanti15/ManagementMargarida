const Rental = require('../Models/RentalModel');

module.exports.Rental = async (req, res, next) => {
  try {
    const {
      name,
      address,
      email,
      phonenumber,
      delivertime,
      pickuptime,
      inflatable,
      price,
      nif,
      paymentmethod
    } = req.body;

    // Check if a rental with the same attributes already exists
    const existingRental = await Rental.findOne({
      name,
      address,
      email,
      phonenumber,
      delivertime,
      pickuptime,
      inflatable,
      price,
      nif,
      paymentmethod
    });

    if (existingRental) {
      return res.json({ message: "Rental already exists" });
    }

    // If no existing rental, create a new one
    const rental = await Rental.create({
      name,
      address,
      email,
      phonenumber,
      delivertime,
      pickuptime,
      inflatable,
      price,
      nif,
      paymentmethod
    });

    res.status(201).json({ message: "Rental created successfully", success: true, rental });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};
