const pool=require("../dbConfig/dbConfig")
class UserAppointments {
  static async getUserAppointments(user_id) {
    try {
      const result = await pool.query(
        "SELECT * FROM Appointments WHERE patient_id=$1",
        [user_id]
      );
      if (result.rows) {
        return { isReturned: true, appointments: result.rows };
      } else {
        return { isReturned: false };
      }
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}

module.exports = UserAppointments;
