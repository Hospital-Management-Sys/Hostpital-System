const pool = require('../dbConfig/dbConfig'); // Ensure this path is correct

// Controller to add available time slots
exports.addAvailableHour = async (req, res) => {
    const { available_from, available_to, is_available, schedule_id } = req.body;

    // Basic validation
    if (!available_from || !available_to || is_available === undefined || !schedule_id) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        const result = await pool.query(
            `INSERT INTO availablehours (available_from, available_to, is_available, schedule_id)
             VALUES ($1, $2, $3, $4) RETURNING *`,
            [available_from, available_to, is_available, schedule_id]
        );

        return res.status(201).json(result.rows[0]); // Respond with the newly created row
    } catch (error) {
        console.error('Error inserting available hour:', error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
};

// Controller to update available time slots
exports.updateAvailableHours = async (req, res) => {
  const { id } = req.params;
  const { available_from, available_to, is_available, schedule_id } = req.body;

  try {
    if (!available_from || !available_to || typeof is_available !== 'boolean' || !schedule_id) {
      return res.status(400).json({ error: 'Missing or invalid required fields' });
    }


    // Check if the new time slot overlaps with existing ones
    const overlapCheck = await pool.query(
      `SELECT * FROM AvailableHours 
       WHERE schedule_id = $1 
       AND id != $2
       AND (
         (available_from, available_to) OVERLAPS ($3::timestamp, $4::timestamp)
       )`,
      [schedule_id, id, available_from, available_to]
    );

    if (overlapCheck.rows.length > 0) {
      return res.status(409).json({ error: 'The new time slot overlaps with existing slots' });
    }

    // Update the record
    const result = await pool.query(
      `UPDATE AvailableHours 
       SET available_from = $1, available_to = $2, is_available = $3, schedule_id = $4
       WHERE id = $5 
       RETURNING *`,
      [available_from, available_to, is_available, schedule_id, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Record not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating available hours:', error); // Add this line
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller to get available time slots
exports.getAvailableHours = async (req, res) => {
    try {
      const { schedule_id } = req.query; // Optional filter by schedule_id
  
      // Build the query
      let query = 'SELECT * FROM AvailableHours';
      const params = [];
  
      // If a schedule_id is provided, filter the results
      if (schedule_id) {
        query += ' WHERE schedule_id = $1';
        params.push(schedule_id);
      }
  
      // Execute the query
      const result = await pool.query(query, params);
      
      // Return the available hours
      res.json(result.rows);
    } catch (error) {
      console.error('Error fetching available hours:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  