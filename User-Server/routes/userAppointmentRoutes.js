const express = require("express");
const appointmentsController = require("../controllers/userAppointments");
const { auth } = require("../middlewares/auth");
const router = express.Router();

router.get(
  "/getUserAppointments",
  auth,
  appointmentsController.getUserAppointments
);

module.exports = router;
