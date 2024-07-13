const { Signup, Login } = require("../Controllers/AuthController");
const { userVerification } = require("../Middlewares/AuthMiddleware");
const { Rental, getFilteredRentals } = require("../Controllers/RentalController");
const { Inflatable, getAllInflatables, changeInflatableState } = require("../Controllers/InflatableController");
const router = require("express").Router();

router.post("/signup", Signup);
router.post('/login', Login);
router.post("/rental", Rental);
router.post("/inflatable", Inflatable);

router.get("/inflatables", getAllInflatables);
router.get("/rental", getFilteredRentals);
router.patch('/inflatable/:inflatableId/change-state', changeInflatableState);

module.exports = router;