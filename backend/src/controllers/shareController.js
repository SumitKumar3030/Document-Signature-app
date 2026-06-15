const crypto = require("crypto");

const Document = require("../models/Document");

exports.generateShareLink = async (req, res) => {
  try {
    const { documentId } = req.body;

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

    const token = crypto.randomBytes(32).toString("hex");

    document.shareToken = token;

    document.tokenExpires = Date.now() + 7 * 24 * 60 * 60 * 1000;

    await document.save();

    res.status(200).json({
      success: true,
      shareLink: `http://localhost:3000/sign/${token}`,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.getDocumentByToken = async (req, res) => {
  try {
    const document = await Document.findOne({
      shareToken: req.params.token,
      tokenExpires: {
        $gt: Date.now(),
      },
    });

    if (!document) {
      return res.status(404).json({
        success: false,
        message: "Invalid or expired link",
      });
    }

    const responseDocument = document.toObject();

    delete responseDocument.shareToken;
    delete responseDocument.tokenExpires;

    res.status(200).json({
  success: true,
  document: responseDocument,
  pdfUrl: `http://localhost:5000/uploads/${document.fileName}`,
});
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
