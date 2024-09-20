const pool = require('../dbConfig/dbConfig'); // Ensure this path is correct

const getDoctorsBySpecialization = async (req, res) => {
  const { specialization } = req.query; // Get the specialization from the query parameter

  if (!specialization) {
    return res.status(400).json({ message: "Specialization is required" });
  }

  try {
    // Raw SQL query to fetch doctors by specialization
    const query = 
     ` SELECT * FROM Doctors
      WHERE specialization = $1`;
    ;

    // Execute the query
    const result = await pool.query(query, [specialization]);

    // If doctors are found, send them as a response
    if (result.rows.length > 0) {
      res.status(200).json(result.rows);
    } else {
      res.status(404).json({ message: "No doctors found with this specialization" });
    }
  } catch (error) {
    // Handle any errors that occur during the query execution
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { getDoctorsBySpecialization };