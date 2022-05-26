const express = require("express");
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require("../config/auth");

//login page default
router.get("/", forwardAuthenticated, (req, res) => res.render("login"));

router.get("/add", ensureAuthenticated, (req, res) => res.render("addPoi"));
router.get("/map", ensureAuthenticated, (req, res) => res.render("map"));
router.get("/search", ensureAuthenticated, (req, res) => res.render("listPoi"));
router.get("/login", ensureAuthenticated, (req, res) => res.render("login"));

//homepage- after login
router.get("/home", ensureAuthenticated, async (req, res) => {
  return res.render("home", {
    user: req.user,
  });
});

module.exports = router;
