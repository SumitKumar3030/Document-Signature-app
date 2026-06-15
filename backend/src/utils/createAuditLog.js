const Audit = require("../models/Audit");

const createAuditLog = async ({
  documentId,
  userId,
  action,
  ipAddress,
}) => {
  try {
    console.log("Creating audit log...");

    const audit = await Audit.create({
      documentId,
      userId,
      action,
      ipAddress,
    });

    console.log("Audit created:", audit._id);
  } catch (error) {
    console.error(
      "Audit log error:",
      error
    );
  }
};

module.exports = createAuditLog;