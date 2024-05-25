const express = require("express");
const router = express.Router();

const userController = require("../controller/user.controller");

router.get("/profile", userController.getUserProfile); // Correct this line
router.get("/", userController.getAllUsers);

module.exports = router;
