const express = require("express");
// const bodyparser = require("body-parser");
const authRoutes = express.Router();
const User = require("../models/user");
authRoutes.post("/signup", async (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });

  const savedUser = await user.save();
  res.send(savedUser);
});

module.exports = authRoutes;
