const { Pool } = require("pg");
require("dotenv").config();

// Database configuration
const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
};
console.log(dbConfig);

const pool = new Pool(dbConfig);


(async () => {
  try {
    const client = await pool.connect();
    console.log("Database connected successfully");
    client.release(); 
  } catch (err) {
    console.error("Error connecting to the database", err.stack);
  }
})();

module.exports = pool;
