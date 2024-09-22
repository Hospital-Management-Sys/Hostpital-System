const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateToken = (user) => {
  try {
    const secret = process.env.SECRET;
    const token = jwt.sign(user, secret);
    console.log(token);
    return token;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

module.exports = generateToken;
