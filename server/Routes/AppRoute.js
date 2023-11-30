const { Signup, Login } = require("../Controllers/AuthController");
const { userVerification } = require("../Middlewares/AuthMiddleware");
const { Rental } = require("../Controllers/RentalController");
const router = require("express").Router();

router.post("/signup", Signup);
router.post('/login', Login)
router.post("/rental", Rental);

module.exports = router;