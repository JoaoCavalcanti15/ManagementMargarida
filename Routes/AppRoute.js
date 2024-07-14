// Importing required functions from controllers and middlewares
const { Signup, Login } = require("../Controllers/AuthController");
const { userVerification } = require("../Middlewares/AuthMiddleware");
const { Rental, getFilteredRentals } = require("../Controllers/RentalController");
const { Inflatable, getAllInflatables, changeInflatableState } = require("../Controllers/InflatableController");

// Creating a new router instance
const router = require("express").Router();

// Route to handle user signup
router.post("/signup", Signup);

// Route to handle user login
router.post('/login', Login);

// Route to create a new rental
router.post("/rental", Rental);

// Route to create a new inflatable
router.post("/inflatable", Inflatable);

// Route to get all inflatables
router.get("/inflatables", getAllInflatables);

// Route to get filtered rentals
router.get("/rental", getFilteredRentals);

// Route to change the state of an inflatable by its ID
router.patch('/inflatable/:inflatableId/change-state', changeInflatableState);

// Exporting the router module
module.exports = router;