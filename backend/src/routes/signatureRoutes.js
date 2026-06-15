

const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  createSignature,
  getSignaturesByDocument,
  updateSignatureStatus,
} = require("../controllers/signatureController");

router.post(
  "/",
  authMiddleware,
  createSignature
);

router.get(
  "/:documentId",
  authMiddleware,
  getSignaturesByDocument
);

router.patch(
  "/:id/status",
  authMiddleware,
  updateSignatureStatus
);

module.exports = router;