const pool = require("../dbConfig/dbConfig");
const hashPassword = require("../utils/hashPassword");
const verifyPassword = require("../utils/verifyPassword");

class User {
  static async createUser(user) {
    const hashedPassword = hashPassword(user.password);

    try {
      const record = await pool.query(
        "SELECT * FROM patientrecords WHERE record_id = $1",
        [user.recordID]
      );
      if (record.rows[0]) {
        const result = await pool.query(
          "INSERT INTO Patients (name,email,password,phone,profilePicture) VALUES ($1,$2,$3,$4,$5) RETURNING user_id",
          [
            user.name,
            user.email,
            hashedPassword,
            user.phone,
            user.profilePicture,
          ]
        );
        return {
          message: "User Created Successfully",
          user: result.rows[0],
          isReturned: true,
        };
      } else {
        return {
          message: "Record Not Found Please check the record ID",
          isReturned: false,
        };
      }
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
  static async loginUser(userCredentials) {
    try {
      const result = await pool.query(
        "SELECT user_id,email,password,name FROM Patients WHERE email=$1",
        [userCredentials.email]
      );
      console.log(result.rows[0]);
      if (result.rows[0]) {
        const hashedPassword = result.rows[0].password;
        const isVerified = verifyPassword({
          hashedPassword: hashedPassword,
          password: userCredentials.password,
        });
        if (isVerified)
          return {
            user: result.rows[0].user_id,
            message: "User Returned Successfully",
            isReturned: true,
            role: "Patient",
          };
        else return { message: "Invalid Credentials", isReturned: false };
      } else return { message: "Invalid Credentials", isReturned: false };
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
  static async getUserData(userID) {
    try {
      const result = await pool.query("SELECT * FROM Users WHERE user_id=$1", [
        userID,
      ]);
      if (result.rows[0]) {
        return { user: result.rows[0], isReturned: true };
      } else {
        return { message: "No User Found", isReturned: false };
      }
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  static async updateUserData(userData) {
    try {
      const isVerified = verifyPassword({
        password: userData.currentPassword,
        hashedPassword: userData.password,
      });

      if (isVerified) {
        const hashedPassword = userData.newPassword
          ? hashPassword(userData.newPassword)
          : userData.password;
        console.log(userData.user_id);
        const result = await pool.query(
          "UPDATE patients SET email= $1, name= $2, phone= $3, password= $4 WHERE user_id= $5 RETURNING user_id, email, name, phone",
          [
            userData.email,
            userData.name,
            userData.phone,
            hashedPassword,
            userData.user_id,
          ]
        );

        console.log(result.rows);

        const { ...safeUserData } = result.rows[0];
        return { user: safeUserData, isReturned: true };
      } else {
        return { message: "Incorrect current password", isReturned: false };
      }
    } catch (e) {
      console.log(e);
      throw {
        message: "Failed to update user data",
        error: e,
        isReturned: false,
      };
    }
  }
}

module.exports = User;
