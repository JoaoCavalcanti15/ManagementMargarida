// Importing mongoose library
const mongoose = require("mongoose");

// Defining the rental schema
const rentalSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"], // Name field is required
    },
    address: {
        type: String,
        required: [true, "Address is required"], // Address field is required
    },
    email: {
        type: String,
        required: [true, "Email is required"], // Email field is required
    },
    phonenumber: {
        type: Number,
        required: [true, "Phone number is required"], // Phone number field is required
    },
    deliverytime: {
        type: Date,
        required: [true, "Delivery time is required"], // Delivery time field is required
    },
    pickuptime: {
        type: Date,
        required: [true, "Pickup time is required"], // Pickup time field is required
    },
    inflatable: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Inflatable", // Reference to the Inflatable model
        required: [true, "Inflatable is required"], // Inflatable field is required
    },
    price: {
        type: Number,
        required: [true, "Price is required"], // Price field is required
    },
    nif: {
        type: Number,
        required: [true, "NIF is required"], // NIF field is required
    },
    paymentmethod: {
        type: String,
        enum: ["Transferência", "MB Way", "Dinheiro"], // Payment method can be 'Transferência', 'MB Way', or 'Dinheiro'
        required: [true, "Payment method is required"], // Payment method field is required
    }
});

// Exporting the Rental model
module.exports = mongoose.model("Rental", rentalSchema, 'Rental');