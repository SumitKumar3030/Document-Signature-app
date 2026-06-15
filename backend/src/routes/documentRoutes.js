const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const {
  uploadDocument,
  getDocuments,
  getDocumentById,
} = require("../controllers/documentController");

router.post(
  "/upload",
  authMiddleware,
  upload.single("document"),
  uploadDocument
);

router.get(
  "/",
  authMiddleware,
  getDocuments
);

router.get(
  "/:id",
  authMiddleware,
  getDocumentById
);

module.exports = router;