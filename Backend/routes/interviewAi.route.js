const express=require("express")
const authMiddleWares=require("../middlewares/auth.middleware")
const interviewController=require("../controller/interviewAi.controller")
const upload=require("../middlewares/file.middleware")

const interviewAiRouter=express().router


// for generating the interview report
interviewAiRouter.post("/",authMiddleWares.authuser,upload.single("resume"),interviewController.generateInterViewReportController)

module.exports=interviewAiRouter