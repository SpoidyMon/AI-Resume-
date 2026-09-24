const express=require("express")
const authMiddleWares=require("../middlewares/auth.middleware")
const interviewController=require("../controller/interviewAi.controller")
const upload=require("../middlewares/file.middleware")

const interviewAiRouter=express.Router()


// for generating the interview report
interviewAiRouter.post("/",authMiddleWares.authuser,upload.single("resumefile"),interviewController.generateInterViewReportController)

// for getting a specific report by interview_id of logged in user
interviewAiRouter.get("/report/:interviewId",authMiddleWares.authuser,interviewController.getInterViewByIdController)

//for getting all reports of a logged in user
interviewAiRouter.get("/",authMiddleWares.authuser,interviewController.getAllInterViewController)

interviewAiRouter.get("/resume/pdf/:interviewId",authMiddleWares.authuser,interviewController.generateResumePdfController);

module.exports=interviewAiRouter