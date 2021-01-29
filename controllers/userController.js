const mongoose = require("mongoose");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();


exports.GetUsers = async (req, res) => {
  try {

    res.status(200).json({ users:"test" });
  } catch (error) {
    res.status(400).json(error);
  }
};

