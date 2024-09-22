const bcrypt = require("bcrypt");

const verifyPassword = ({ password, hashedPassword }) => {
  const isVerified = bcrypt.compareSync(password, hashedPassword);
  return isVerified;
};

module.exports = verifyPassword;
