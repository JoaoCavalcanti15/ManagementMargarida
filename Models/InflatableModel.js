// Importing mongoose library
const mongoose = require("mongoose");

// Defining the inflatable schema
const inflatableSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"], // Name field is required
    },
    state: {
        type: String,
        enum: ["FOR_DELIVERY", "FOR_CLEANING"], // State can be either 'FOR_DELIVERY' or 'FOR_CLEANING'
        required: [true, "State is required"], // State field is required
    }
});

// Exporting the Inflatable model
module.exports = mongoose.model("Inflatable", inflatableSchema);