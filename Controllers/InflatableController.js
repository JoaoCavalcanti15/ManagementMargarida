const Inflatable = require('../Models/InflatableModel');

module.exports.Inflatable = async (req, res) => {
  try {
    const { name, state } = req.body;

    // Check if an inflatable with the same name already exists
    const existingInflatable = await Inflatable.findOne({ name });

    if (existingInflatable) {
      return res.status(400).json({ message: "Inflatable with that name already exists" });
    }

    const newInflatable = new Inflatable({
      name,
      state
    });

    const savedInflatable = await newInflatable.save();

    res.status(201).json({ message: "Inflatable created successfully", success: true, inflatable: savedInflatable });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};

module.exports.getAllInflatables = async (req, res) => {
  try {
    const inflatables = await Inflatable.find();
    res.json(inflatables);
  } catch (error) {
    console.error('Error fetching inflatables:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Change state of inflatable by ID
module.exports.changeInflatableState = async (req, res, next) => {
  const { inflatableId } = req.params;

  try {
    const inflatable = await Inflatable.findById(inflatableId);
    if (!inflatable) {
      return res.status(404).json({ message: 'Inflatable not found' });
    }

    // Toggle between the two states (example logic, adjust as per your requirements)
    inflatable.state = inflatable.state === 'FOR_DELIVERY' ? 'FOR_CLEANING' : 'FOR_DELIVERY';
    await inflatable.save();

    res.json(inflatable);
  } catch (error) {
    console.error('Error changing inflatable state:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};