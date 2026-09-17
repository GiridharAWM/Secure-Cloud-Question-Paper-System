const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

const authRoutes = require("./routes/authRoutes");
const testRoutes = require("./routes/testRoutes");
const questionPaperRoutes = require("./routes/questionPaperRoutes");
const auditRoutes = require("./routes/auditRoutes");

dotenv.config();

// Database
require("./database/db");
require("./database/initDB");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/test", testRoutes);
app.use("/api/papers", questionPaperRoutes);
app.use("/api/audit", auditRoutes);

// -------------------------------
// Serve Frontend
// -------------------------------
app.use(express.static(path.join(__dirname, "../frontend")));

// Home Page
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

// Direct HTML routes
app.get("/setter", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/setter.html"));
});

app.get("/reviewer", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/reviewer.html"));
});

app.get("/authority", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/authority.html"));
});

app.get("/security", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/security.html"));
});

// Examination Center
app.get("/exam-center", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/exam-center.html"));
});

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});