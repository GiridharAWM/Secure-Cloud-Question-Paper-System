const express = require("express");

const router = express.Router();

const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");
const controller = require("../controllers/questionPaperController");

// ==========================
// Question Setter
// ==========================
router.post(
    "/create",
    auth,
    role("Question Setter"),
    controller.createPaper
);

// ==========================
// Reviewer
// ==========================

// View pending papers
router.get(
    "/pending",
    auth,
    role("Reviewer"),
    controller.getPendingPapers
);

// Review paper
router.post(
    "/review",
    auth,
    role("Reviewer"),
    controller.reviewPaper
);

// ==========================
// Examination Authority
// ==========================

// Approve paper
router.post(
    "/approve",
    auth,
    role("Examination Authority"),
    controller.approvePaper
);

// Schedule paper
router.post(
    "/schedule",
    auth,
    role("Examination Authority"),
    controller.schedulePaper
);

// ==========================
// Authorized Delivery
// ==========================
router.get(
    "/release/:id",
    auth,
    controller.releasePaper
);

// ==========================
// View All Papers
// ==========================
router.get(
    "/all",
    auth,
    controller.getAllPapers
);

module.exports = router;