
const express=require("express");

const router=express.Router();

const auth=require("../middleware/authMiddleware");
const role=require("../middleware/roleMiddleware");

const controller=require("../controllers/questionPaperController");

router.post(
    "/create",
    auth,
    role("Question Setter"),
    controller.createPaper
);

router.post(
    "/review",
    auth,
    role("Reviewer"),
    controller.reviewPaper
);

router.post(
    "/approve",
    auth,
    role("Examination Authority"),
    controller.approvePaper
);

router.post(
    "/schedule",
    auth,
    role("Examination Authority"),
    controller.schedulePaper
);

router.get(
    "/release/:id",
    auth,
    controller.releasePaper
);

router.get(
    "/all",
    auth,
    controller.getAllPapers
);

module.exports=router;