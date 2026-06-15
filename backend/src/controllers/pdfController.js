const fs = require("fs");
const path = require("path");
const { PDFDocument, rgb } = require("pdf-lib");

const Document = require("../models/Document");
const Signature = require("../models/Signature");
const createAuditLog = require("../utils/createAuditLog");

exports.finalizeDocument = async (req, res) => {
  try {
    const { documentId, signerName } = req.body;

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

    const pdfBytes = fs.readFileSync(
      document.filePath
    );

    const pdfDoc =
      await PDFDocument.load(pdfBytes);

    const pages = pdfDoc.getPages();

    const firstPage = pages[0];

    firstPage.drawText(
      `Digitally Signed By: ${signerName}`,
      {
        x: 50,
        y: 50,
        size: 18,
      }
    );

    const signedPdfBytes =
      await pdfDoc.save();

    const signedFileName =
      `signed-${Date.now()}.pdf`;

    const signedDir = path.join(
      __dirname,
      "../signed-documents"
    );

    if (!fs.existsSync(signedDir)) {
      fs.mkdirSync(signedDir, {
        recursive: true,
      });
    }

    const signedPath = path.join(
      signedDir,
      signedFileName
    );

    fs.writeFileSync(
      signedPath,
      signedPdfBytes
    );

    res.status(200).json({
  success: true,
  pdfUrl: `https://document-signature-app-skwy.onrender.com/signed-documents/${signedFileName}`,
});
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};