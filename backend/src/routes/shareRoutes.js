const express = require("express");

const router = express.Router();

const authMiddleware = require(
  "../middleware/authMiddleware"
);

const {
  generateShareLink,
  getDocumentByToken,
} = require("../controllers/shareController");

router.post(
  "/generate",
  authMiddleware,
  generateShareLink
);

router.get(
  "/:token",
  getDocumentByToken
);

module.exports = router;