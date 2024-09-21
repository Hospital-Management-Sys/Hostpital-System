const pool = require('../dbConfig/dbConfig');

exports.submitContactForm = async (req, res) => {
  const { name, email, subject, message } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO ContactUs (name, email, subject, message) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, email, subject, message]
    );
    res.status(201).json({
      success: true,
      data: result.rows[0],
      message: 'Contact form submitted successfully'
    });
  } catch (error) {
    console.error('Error inserting contact form data:', error);
    res.status(500).json({
      success: false,
      error: 'An error occurred while submitting the form'
    });
  }
};