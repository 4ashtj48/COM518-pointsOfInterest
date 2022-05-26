const express = require("express");
const router = express.Router();
var reviewController = require("../Controllers/reviewController");
var multer = require("multer");
var upload = multer();
const { ensureAuthenticated, forwardAuthenticated } = require("../config/auth");

router.get("/", reviewController.findReview);

// Create
router.post(
  "/",
  [upload.none(), ensureAuthenticated],
  reviewController.addReview
);
// Read
router.get("/:id", reviewController.reviewDetail);
// Update
router.put(
  "/:id",
  [upload.none(), ensureAuthenticated],
  reviewController.updateReview
);
// Delete
router.delete(
  "/:id",
  [upload.none(), ensureAuthenticated],
  reviewController.deleteReview
);

module.exports = router;
