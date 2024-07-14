// Importing the Inflatable model
const Inflatable = require('../Models/InflatableModel');

// Function to create a new inflatable
module.exports.Inflatable = async (req, res) => {
  try {
    // Extracting name and state from request body
    const { name, state } = req.body;

    // Check if an inflatable with the same name already exists
    const existingInflatable = await Inflatable.findOne({ name });
    if (existingInflatable) {
      // If inflatable already exists, send a bad request response
      return res.status(400).json({ message: "Inflatable with that name already exists" });
    }

    // Creating a new inflatable instance with provided details
    const newInflatable = new Inflatable({ name, state });

    // Saving the new inflatable to the database
    const savedInflatable = await newInflatable.save();

    // Sending a success response with the saved inflatable object
    res.status(201).json({ message: "Inflatable created successfully", success: true, inflatable: savedInflatable });
  } catch (error) {
    // Logging the error and sending an error response
    console.error(error);
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};

// Function to get all inflatables
module.exports.getAllInflatables = async (req, res) => {
  try {
    // Fetching all inflatables from the database
    const inflatables = await Inflatable.find();
    
    // Sending the inflatables as the response
    res.json(inflatables);
  } catch (error) {
    // Logging the error and sending an error response
    console.error('Error fetching inflatables:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Function to change the state of an inflatable by ID
module.exports.changeInflatableState = async (req, res, next) => {
  // Extracting inflatable ID from request parameters
  const { inflatableId } = req.params;

  try {
    // Finding the inflatable by ID
    const inflatable = await Inflatable.findById(inflatableId);
    
    if (!inflatable) {
      // If inflatable is not found, send a not found response
      return res.status(404).json({ message: 'Inflatable not found' });
    }

    // Toggle the state between 'FOR_DELIVERY' and 'FOR_CLEANING'
    inflatable.state = inflatable.state === 'FOR_DELIVERY' ? 'FOR_CLEANING' : 'FOR_DELIVERY';
    
    // Saving the updated inflatable state to the database
    await inflatable.save();

    // Sending the updated inflatable as the response
    res.json(inflatable);
  } catch (error) {
    // Logging the error and sending an error response
    console.error('Error changing inflatable state:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};