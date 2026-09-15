const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const testRoutes = require("./routes/testRoutes");
const questionPaperRoutes = require("./routes/questionPaperRoutes");
const auditRoutes = require("./routes/auditRoutes");

dotenv.config();

// Database
require("./database/db");
require("./database/initDB");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/test", testRoutes);
app.use("/api/papers", questionPaperRoutes);
app.use("/api/audit", auditRoutes);

// Test Route
app.get("/", (req, res) => {
    res.json({
        message: "Secure Cloud-Based Question Paper Management System API is running."
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});