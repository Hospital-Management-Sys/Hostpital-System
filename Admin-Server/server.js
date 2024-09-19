//imports
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
require("dotenv").config();

const adminRoutes = require('./routes/adminRoutes');


//server constants
const corsConfig = { origin: "http://localhost:5173", credentials: true };
const port = process.env.PORT || 5000;
//Middlewares:
//cors
app.use(cors(corsConfig));
//bodyParser
app.use(bodyParser.json());
app.use('/api', adminRoutes);
//controllerRoutes:

//server connection
app.listen(port, () => {
  console.log(`Running admin server on port http://localhost:${port}`);
});
