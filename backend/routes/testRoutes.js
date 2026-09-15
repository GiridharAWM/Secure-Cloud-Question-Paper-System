const express = require("express");

const router = express.Router();

const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

router.get(
    "/setter-only",
    auth,
    role("Question Setter"),
    (req, res) => {
        res.json({
            message: "Welcome Question Setter!"
        });
    }
);

module.exports = router;