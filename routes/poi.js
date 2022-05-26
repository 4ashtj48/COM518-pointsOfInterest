const express = require("express");
const router = express.Router();
var poiController = require("../Controllers/poiController");
var multer = require("multer");
var upload = multer();
const { ensureAuthenticated, forwardAuthenticated } = require("../config/auth");

router.get("/", ensureAuthenticated, poiController.findPoi);
// Create
router.post("/", [upload.none(), ensureAuthenticated], poiController.addPoi);
// Read
router.get("/:id", ensureAuthenticated, poiController.poiDetail);
// Update
router.put(
  "/:id",
  [upload.none(), ensureAuthenticated],
  poiController.updatePoi
);
// Delete
router.delete(
  "/:id",
  [upload.none(), ensureAuthenticated],
  poiController.deletePoi
);

module.exports = router;
