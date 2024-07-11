const mongoose = require("mongoose");

const rentalSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
    },
    address: {
        type: String,
        required: [true, "Address is required"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
    },
    phonenumber: {
        type: Number,
        required: [true, "Phone number is required"],
    },
    deliverytime: {
        type: Date,
        required: [true, "Deliver time required"],
    },
    pickuptime: {
        type: Date,
        required: [true, "Pickup time required"],
    },
    inflatable: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Inflatable",
        required: [true, "Inflatable is required"],
    },
    price: {
        type: Number,
        required: [true, "Price required"],
    },
    nif: {
        type: Number,
        required: [true, "Nif required"],
    },
    paymentmethod: {
        type: String,
        enum: ["Transferência", "MB Way", "Dinheiro"],
        required: [true, "Payment method is required"],
    }
});

module.exports = mongoose.model("Rental", rentalSchema, 'Rental');
