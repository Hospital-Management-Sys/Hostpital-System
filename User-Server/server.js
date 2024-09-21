//imports
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
require("dotenv").config();
const patientRoutes = require("./routes/patientRoutes");

//server constants
const corsConfig = { origin: "http://localhost:5173", credentials: true };
const port = process.env.PORT || 3000;
//Middlewares:
//cors
app.use(cors(corsConfig));
//bodyParser
app.use(bodyParser.json());

//controllerRoutes:
app.use("/api/patients", patientRoutes);
//server connection
app.listen(port, () => {
  console.log(`Running server on port http://localhost:${port}`);
});
