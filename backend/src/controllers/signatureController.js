const Signature = require("../models/Signature");
const Document = require("../models/Document");
const createAuditLog = require("../utils/createAuditLog");

exports.createSignature = async (req, res) => {
  try {
    const { documentId, x, y, page } = req.body;

    const document = await Document.findOne({
      _id: documentId,
      owner: req.user,
    });

    if (!document) {
      return res.status(404).json({
        success: false,
        message: "Document not found",
      });
    }

    const signature = await Signature.create({
      documentId,
      signer: req.user,
      x,
      y,
      page,
    });

    await createAuditLog({
      documentId,
      userId: req.user,
      action: "SIGNATURE_CREATED",
      ipAddress: req.ip,
    });

    res.status(201).json({
      success: true,
      signature,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.getSignaturesByDocument = async (req, res) => {
  try {
    const signatures = await Signature.find({
      documentId: req.params.documentId,
    });

    res.status(200).json({
      success: true,
      count: signatures.length,
      signatures,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.updateSignatureStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["pending", "signed", "rejected"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status",
      });
    }

    const signature = await Signature.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!signature) {
      return res.status(404).json({
        success: false,
        message: "Signature not found",
      });
    }

    await createAuditLog({
      documentId: signature.documentId,
      userId: req.user,
      action: `SIGNATURE_${status.toUpperCase()}`,
      ipAddress: req.ip,
    });

    res.status(200).json({
      success: true,
      signature,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};