const express= require("express")
const createReviewHandler= require("../handlers/reviewHandler");

const router= express.Router();

router.post("/", createReviewHandler);

module.exports= router;