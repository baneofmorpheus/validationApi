const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/", userController.GetUsers);

module.exports = router;
