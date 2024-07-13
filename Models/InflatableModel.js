const mongoose = require("mongoose");

const inflatableSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
    },
    state: {
        type: String,
        enum: ["FOR_DELIVERY", "FOR_CLEANING"],
        required: [true, "State is required"],
    }
});

module.exports = mongoose.model("Inflatable", inflatableSchema);