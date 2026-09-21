const express=require("express")
const authMiddleWares=require("../middlewares/auth.middleware")
const interviewController=require("../controller/interviewAi.controller")
const upload=require("../middlewares/file.middleware")

const interviewAiRouter=express().router


// for generating the interview report
interviewAiRouter.post("/",authMiddleWares.authuser,upload.single("resume"),interviewController.generateInterViewReportController)

// for getting a specific report by interview_id of logged in user
interviewAiRouter.get("/report/:interview_id",authMiddleWares.authuser,interviewController.getInterViewByIdController)

//for getting all reports of a logged in user
interviewAiRouter.get("/",authMiddleWares.authuser,interviewController.getAllInterViewController)

module.exports=interviewAiRouter