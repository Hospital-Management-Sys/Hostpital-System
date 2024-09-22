const JWT = require("jsonwebtoken");
require("dotenv").config();
exports.auth = (req, res, next) => {
  const cookie = req.cookies;
  const secret = process.env.SECRET;
  try {
    const token = cookie.token;
    if (!token) {
      res.status(401).json({ message: "Unauthorized access" });
    }
    const decoded = JWT.verify(token, secret);
    req.user = decoded;
    next();
  } catch (e) {
    res.status(401).json({ message: "Unautorized access", error: e });
  }
};
