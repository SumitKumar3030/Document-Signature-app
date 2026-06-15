const express = require("express");

const router = express.Router();

const authMiddleware = require(
  "../middleware/authMiddleware"
);

const {
  getAuditLogs,
} = require("../controllers/auditController");

router.get(
  "/:documentId",
  authMiddleware,
  getAuditLogs
);

module.exports = router;