// imports
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { processImage } = require("./middlewares/imageProccessor");
const app = express();
const drRouter = require("./routes/drRoutes");
const availableHoursRoutes = require("./routes/appointmentRoutes");
const recordRoutes = require("./routes/recordRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const patientRoutes = require("./routes/patientRoutes");
const userRoutes=require("./routes/userRoutes");
const cookieParser = require("cookie-parser");
const contactRoutes = require("./routes/contactusRouter");
require('dotenv').config();

// server constants
const corsConfig = { origin: "http://localhost:5173", credentials: false };
const port = process.env.PORT || 3000;

// Middlewares
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  next();
});
app.use(cors(corsConfig));
app.use(cookieParser());
app.use(bodyParser.json());

// controllerRoutes
app.use("/drs", drRouter);
app.use("/api", recordRoutes);
app.use(appointmentRoutes);
app.use("/api/avahours", availableHoursRoutes);
app.use("/api/users", processImage, patientRoutes);
app.use('/api/avahours', availableHoursRoutes); 
app.use('/api/contact', contactRoutes);



// server connection
app.listen(port, () => {
  console.log(`Running server on port http://localhost:${port}`);
});
