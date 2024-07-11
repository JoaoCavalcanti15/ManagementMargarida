const { Signup, Login } = require("../Controllers/AuthController");
const { userVerification } = require("../Middlewares/AuthMiddleware");
const { Rental } = require("../Controllers/RentalController");
const { Inflatable, getAllInflatables } = require("../Controllers/InflatableController");
const router = require("express").Router();

router.post("/signup", Signup);
router.post('/login', Login)
router.post("/rental", Rental);
router.post("/inflatable", Inflatable);

router.get("/inflatables", getAllInflatables);

module.exports = router;