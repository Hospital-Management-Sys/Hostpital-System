const generateToken = require("../utils/generateToken");
const { createUser, loginUser } = require("../models/User");
const { loginDoctor } = require("../models/Doctor");
exports.registerUser = async (req, res) => {
  const userData = req.body;
  console.log(req.picture);
  console.log(userData);
  try {
    const result = await createUser(userData);

    if (result.isReturned) {
      const cookieOptions = {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24,
        sameSite: "None",
        secure: true,
      };
      const token = generateToken(result.user);
      res.cookie("token", token, cookieOptions);
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
  const { email, password, isDoctor } = req.body;

  try {
    let result;
    if (isDoctor === "true") {
      result = await loginDoctor({ email, password });
    } else {
      result = await loginUser({ email, password });
    }
    console.log(result);
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
        .json({ message: "User successfully created", role: `${result.role}` });
    } else {
      res.status(204).json({ message: "Invalid Credentials" });
    }
  } catch (e) {
    console.log(e);
    res.status(501).json({ message: "Internal server error", error: e });
  }
};
