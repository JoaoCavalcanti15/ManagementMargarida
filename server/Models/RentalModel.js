const mongoose = require("mongoose");

const rentalSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
    },
    adress: {
        type: String,
        required: [true, "Adress is required"],
    },
    email: {
        type: email,
        required: [true, "Email is required"],
    },
    phonenumber: {
        type: Number,
        required: [true, "Phone number is required"],
    },
    delivertime: {
        type: Date,
        required: [true, "Deliver time required"],
    },
    pickuptime: {
        type: Date,
        required: [true, "Pickup time required"],
    },
    price: {
        type: Number,
        required: [true, "Price required"],
    }

  });