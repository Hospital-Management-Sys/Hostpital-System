// imports
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const drRouter = require('./routes/drRoutes'); // Ensure this path is correct
const availableHoursRoutes = require('./routes/appointmentRoutes'); // Ensure this path is correct

require('dotenv').config();

// server constants
// const corsConfig = { origin: "http://localhost:5173/", credentials: true };
const port = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// controllerRoutes
app.use('/drs', drRouter); // Corrected line
const recordRoutes = require('./routes/recordRoutes');
app.use('/api', recordRoutes);

app.use('/api/avahours', availableHoursRoutes); // Use the new routes

// server connection
app.listen(port, () => {
  console.log(`Running admin server on http://localhost:${port}`);
});