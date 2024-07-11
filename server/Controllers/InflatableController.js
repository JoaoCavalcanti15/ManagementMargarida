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