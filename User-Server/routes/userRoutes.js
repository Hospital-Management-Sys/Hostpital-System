const express = require("express");
const router = express.Router();
const {
  getUserData,
  updateUserInformation,
} = require("../controllers/userController");
const { auth } = require("../middlewares/auth");
router.get("/getUserData", auth, getUserData);
router.put("/updateUserData", auth, updateUserInformation);

module.exports = router;
