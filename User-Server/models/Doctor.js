const pool = require("../dbConfig/dbConfig");
const verifyPassword = require("../utils/verifyPassword");

class Doctor {
  static async loginDoctor(doctorCredentials) {
    try {
      const result = await pool.query(
        "SELECT user_id, password FROM Doctors WHERE email=$1",
        [doctorCredentials.email]
      );

      console.log(result.rows[0]);

      if (result.rows.length > 0) {
        const isVerified = verifyPassword({
          hashedPassword: result.rows[0].password,
          password: doctorCredentials.password,
        });

        console.log(isVerified);
        console.log("Entered Password:", doctorCredentials.password);
        console.log("Hashed Password from DB:", result.rows[0].password);
        
        if (isVerified) {
          return {
            isReturned: true,
            user: {
              user_id: result.rows[0].user_id,
              // Include any other user fields you may need
            },
            message: "User returned successfully",
            role: "Doctor",
          };
        } else {
          return { message: "Invalid Credentials", isReturned: false };
        }
      } else {
        return { message: "Invalid Credentials", isReturned: false };
      }
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}

module.exports = Doctor;
