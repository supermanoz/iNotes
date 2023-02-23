const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { json } = require("express");
const fetchUser = require("../middleware/fetchUser");

const JWT_SECRET = "THISISASECRET";
//to create an user
router.post(
  "/createuser",
  [
    body("name").isLength({ min: 3 }),
    body("email").isEmail(),
    body("password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    let success = false;
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }

    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ success, error: "User with this email already exists" });
      }

      const salt = await bcrypt.genSalt(10);
      const securedPass = await bcrypt.hashSync(req.body.password, salt);
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: securedPass,
      });

      const data = {
        user: {
          id: user.id,
        },
      };

      let token = jwt.sign(data, JWT_SECRET);
      success = true;
      res.send({ success, token });
    } catch (error) {
      console.error(error);
      res.status(500).json(success, "Some internal error occured!");
    }
  }
);

//to authenticate an user
router.post(
  "/userlogin",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password is blank").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    let success = false;
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }
    try {
      let user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res
          .status(400)
          .json(success, "Either email or password is incorrect!");
      }
      if (!bcrypt.compare(req.body.password, user.password)) {
        return res
          .status(400)
          .json(success, "Either email or password is incorrect!");
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      const token = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ success, token });
    } catch (error) {
      console.error(error);
      res.status(500).json(success, "Some internal error occured!");
    }
  }
);

//to fetch user data
router.post("/getuser", fetchUser, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error);
    res.status(500).json("Some internal error occured");
  }
});

module.exports = router;
