const { loginUser, registerUser } = require("../controllers/userController");
const express = require("express");
const router = express.Router();

router.post("/loginPatient", loginUser);
router.post("/registerPatient", registerUser);

module.exports = router;
