const Document = require("../models/Document");

const createAuditLog = require(
  "../utils/createAuditLog"
);

exports.uploadDocument = async (req, res) => {
  try {
    const document = await Document.create({
      owner: req.user,
      originalName: req.file.originalname,
      fileName: req.file.filename,
      filePath: req.file.path,
    });

    await createAuditLog({
  documentId: document._id,
  userId: req.user,
  action: "DOCUMENT_UPLOADED",
  ipAddress: req.ip,
});

    res.status(201).json({
      success: true,
      document,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

  exports.getDocuments = async (req, res) => {
  try {
    const documents = await Document.find({
      owner: req.user,
    }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: documents.length,
      documents,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.getDocumentById = async (req, res) => {
  try {
    const document = await Document.findOne({
      _id: req.params.id,
      owner: req.user,
    });

    if (!document) {
      return res.status(404).json({
        success: false,
        message: "Document not found",
      });
    }

    res.status(200).json({
      success: true,
      document,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};