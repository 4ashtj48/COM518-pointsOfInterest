const express = require("express");
const router = express.Router();
const passport = require("passport");

// Load User model
const User = require("../models/users");
const { ensureAuthenticated, forwardAuthenticated } = require("../config/auth");

//standard
// Login
router.post("/login", passport.authenticate("local"), (req, res, next) => {
  res.json(req.user);
});

router.post("/logout", function (req, res) {
  req.logout();
  res.redirect("/?logout=true");
});

module.exports = router;
