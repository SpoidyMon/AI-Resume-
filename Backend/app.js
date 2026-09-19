const express = require("express");
const authRouter=require("./routes/auth.route.js")
const InterviewRouter=require('./routes/interviewAi.route.js')
const cookieParser=require("cookie-parser")
const cors =require("cors")
// const geminiResp=require("./Services/api.service.js");
// const { resume, selfDescription, jobDescription } = require("./Services/temp.js");

const app=express();
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:"http://localhost:3000",
    credentials:true
})
)

// geminiResp({ resume, selfDescription, jobDescription })

app.use("/routes/api/auth",authRouter);
app.use("/routes/interview.routes",InterviewRouter)

module.exports=app;