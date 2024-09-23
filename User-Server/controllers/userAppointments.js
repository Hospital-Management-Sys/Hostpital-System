const { getUserAppointments } = require("../models/userAppointments");

exports.getUserAppointments = async (req, res) => {
  const userID = req.user;

  try {
    const appointments = await getUserAppointments(userID);
    if (appointments.isReturned) {
      res.status(200).json({
        message: "Appointments fetched successfully",
        appointments: appointments.appointments,
      });
    } else {
      res.status(204).json({ message: "No Appointments Found" });
    }
  } catch (e) {
    console.log(e);
    res.status(501).json({ message: "Internal server error", error: e });
  }
};
