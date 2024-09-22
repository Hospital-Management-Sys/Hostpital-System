const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const db = require("./dbConfig/dbConfig");
require("dotenv").config();

const adminRoutes = require('./routes/adminRoutes');
const userRoutes = require('./routes/userRoutes');
const patientRoutes = require('./routes/patientRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const patientRecordRoutes = require('./routes/patientRecordRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const availableHourRoutes = require('./routes/availableHourRoutes');
const doctorsScheduleRoutes = require('./routes/doctorsScheduleRoutes');
const doctorRoutes = require('./routes/doctorRoutes');

//server constants
const corsConfig = { origin: "http://localhost:5173", credentials: true };
const port = process.env.PORT || 5000;
//Middlewares:
//cors
app.use(cors(corsConfig));
//bodyParser
app.use(bodyParser.json());
app.use('/api', adminRoutes);
app.use('/api/users', userRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/patientrecords', patientRecordRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/availablehours', availableHourRoutes);
app.use('/api/doctorschedules', doctorsScheduleRoutes);
app.use('/doctors', doctorRoutes);

//controllerRoutes:

//server connection
app.listen(port, () => {
  console.log(`Running admin server on port http://localhost:${port}`);
});
