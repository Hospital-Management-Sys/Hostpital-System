const pool = require("../dbConfig/dbConfig");
const verifyPassword = require("../utils/verifyPassword");
class Doctor {
  static async loginDoctor(doctorCredentials) {
    try {
      const result = await pool.query(
        "SELECT user_id,email,password FROM Doctors WHERE email=$1",
        [doctorCredentials.email]
      );

      if (result.rows[0]) {
        const isVerified = verifyPassword({
          hashedPassword: result.rows[0].password,
          password: doctorCredentials.password,
        });
        if (isVerified) {
          return {
            isReturned: true,
            user: result.rows[0].user_id,
            message: "User returned successfully",
            role: "Doctor",
          };
        } else return { message: "Invalid Credentials", isReturned: false };
      } else return { message: "invalid Credentials", isReturned: false };
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}

module.exports = Doctor;
