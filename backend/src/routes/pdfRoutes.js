const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  finalizeDocument,
} = require("../controllers/pdfController");

router.post(
  "/finalize",
  authMiddleware,
  finalizeDocument
);

module.exports = router;