const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const path = require("path");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const documentRoutes = require("./routes/documentRoutes");
const signatureRoutes = require("./routes/signatureRoutes");
const pdfRoutes = require("./routes/pdfRoutes");
const auditRoutes = require("./routes/auditRoutes");
const shareRoutes = require("./routes/shareRoutes");

const upload = require("./middleware/uploadMiddleware");

dotenv.config();

connectDB();

const app = express();

/* FIXED CORS */
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://document-signature-app-jet.vercel.app",
    ],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);

app.use(
  "/signed-documents",
  express.static(path.join(__dirname, "signed-documents"))
);

app.use("/api/auth", authRoutes);
app.use("/api/docs", documentRoutes);
app.use("/api/signatures", signatureRoutes);
app.use("/api/pdf", pdfRoutes);
app.use("/api/audit", auditRoutes);
app.use("/api/share", shareRoutes);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Document Signature API Running",
  });
});

app.post(
  "/api/test-upload",
  upload.single("document"),
  (req, res) => {
    res.json({
      success: true,
      file: req.file,
    });
  }
);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});