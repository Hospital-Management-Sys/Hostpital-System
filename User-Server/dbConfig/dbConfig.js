const { Pool } = require('pg');
require('dotenv').config();

// Database configuration
const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
};
console.log(dbConfig)
// Create a new pool instance
const pool = new Pool(dbConfig);

// Optional: Test the connection once (useful for initial debugging)
// You might want to remove or comment this out in production
(async () => {
  try {
    const client = await pool.connect();
    console.log("Database connected successfully");
    client.release(); // release the client back to the pool
  } catch (err) {
    console.error("Error connecting to the database", err.stack);
  }
})();

module.exports = pool;