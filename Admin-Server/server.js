//imports
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const db = require("./dbConfig/dbConfig");
require("dotenv").config();

//server constants
const corsConfig = { origin: "http://localhost:5173", credentials: true };
const port = process.env.PORT || 3000;
//Middlewares:
//cors
app.use(cors(corsConfig));
//bodyParser
app.use(bodyParser.json());

//controllerRoutes:

//server connection
app.listen(port, () => {
  console.log(`Running admin server on port http://localhost:${port}`);
});
