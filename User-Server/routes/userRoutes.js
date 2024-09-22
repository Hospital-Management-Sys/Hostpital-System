const express = require("express");
const router = express.Router();
const { getUserData } = require("../controllers/userController");
const { auth } = require("../middlewares/auth");
router.get("/getUserData", auth, getUserData);

module.exports = router;
