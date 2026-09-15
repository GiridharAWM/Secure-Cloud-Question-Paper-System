const express = require("express");

const router = express.Router();

const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

const controller = require("../controllers/auditController");

router.get(
    "/logs",
    auth,
    role("Security Administrator"),
    controller.getLogs
);

module.exports = router;