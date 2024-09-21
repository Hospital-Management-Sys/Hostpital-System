const generateToken = require("../utils/generateToken");
const { createUser, loginUser } = require("../models/User");
exports.registerUser = async (req, res) => {
  const userData = req.body;

  try {
    const result = await createUser(userData);

    if (result.isReturned) {
      const cookieOptions = {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24,
        sameSite: "none",
        secure: true,
      };
      const token = generateToken(result.user);

      res.cookie("token", token, cookieOptions);
      console.log(token);
      res
        .status(201)
        .json({ message: "User successfully created", role: "Patient" });
    } else {
      res.status(204).json({ message: "No record was found" });
    }
  } catch (e) {
    console.log(e);
    res.status(501).json({ message: "Internal server error", error: e });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await loginUser({ email, password });
    if (result.isReturned) {
      const cookieOptions = {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24,
        sameSite: "none",
        secure: true,
      };
      const token = generateToken(result.user);
      res.cookie("token", token, cookieOptions);
      res
        .status(200)
        .json({ message: "User successfully created", role: "Patient" });
    } else {
      res.status(204).json({ message: "Invalid Credentials" });
    }
  } catch (e) {
    console.log(e);
    res.status(501).json({ message: "Internal server error", error: e });
  }
};
