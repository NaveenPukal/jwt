const express = require("express");
const bodyparser = require("body-parser");
const authRoutes = express.Router();
const User = require("../models/user");
const { hashGenerate, hashValidator } = require("../helpers/hashing");

//signup

authRoutes.post("/signup", async (req, res) => {
  try {
    const hashPassword = await hashGenerate(req.body.password);
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashPassword,
    });

    const savedUser = await user.save();
    res.send(savedUser);
  } catch (error) {
    res.send(error);
  }
});

//Login

authRoutes.post("/signin", async (req, res) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });
    if (!existingUser) {
      res.send("Invalid Email");
    } else {
      const CheckUser = await hashValidator(
        req.body.password,
        existingUser.password
      );
      if (!CheckUser) {
        res.send("Password is Invalid");
      } else {
        res.send("Login Successfull..");
      }
    }
  } catch (error) {
    res.send(error);
  }
});

module.exports = authRoutes;
