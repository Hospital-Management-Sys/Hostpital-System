const pool = require('../dbConfig/dbConfig');

// Function to fetch all doctors
const getAllDoctors = async (req, res) => {
  try {
    const query = `SELECT * FROM Doctors`;
    const result = await pool.query(query);

    if (result.rows.length > 0) {
      res.status(200).json(result.rows);
    } else {
      res.status(404).json({ message: "No doctors found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Function to fetch doctors by specialization
const getDoctorsBySpecialization = async (req, res) => {
  const { specialization } = req.query;

  if (!specialization) {
    return res.status(400).json({ message: "Specialization is required" });
  }

  try {
    const query = `SELECT * FROM Doctors WHERE specialization = $1`;
    const result = await pool.query(query, [specialization]);

    if (result.rows.length > 0) {
      res.status(200).json(result.rows);
    } else {
      res.status(404).json({ message: "No doctors found with this specialization" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Function to fetch a doctor by ID
const getDoctorById = async (req, res) => {
    const { id } = req.params; // The doctor id will come from the request parameters
  
    try {
      // Use 'user_id' instead of 'id' since that's the correct column name
      const query = `SELECT * FROM Doctors WHERE user_id = $1`;
      const result = await pool.query(query, [id]);
  
      // If the doctor is found, return the doctor details
      if (result.rows.length > 0) {
        res.status(200).json(result.rows[0]);
      } else {
        res.status(404).json({ message: "Doctor not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  
  
  

module.exports = {
  getAllDoctors,
  getDoctorsBySpecialization,
  getDoctorById,
};
