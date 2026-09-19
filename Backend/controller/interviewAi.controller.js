const pdfParse=require("pdf-parse")
const generateInterviewReport=require('../Services/api.service')
const interviewReportModel=require("../model/interviewReport.model")

const generateInterViewReportController=async(req,res)=>{
    const resumeContent = await (new pdfParse.PDFParse(Uint8Array.from(req.file.buffer))).getText()
    const {selfDescription,jobDescription} = req.body;

    const interviewReportByAi=await generateInterviewReport({
        resume:resumeContent.text,
        selfDescription,
        jobDescription,
    })

    const interviewReport=await interviewReportModel.create({
        user:req.user._id,
        resume:resumeContent.text,
        selfDescription,
        jobDescription,
        ...interviewReportByAi
    })

    res.status(201).json({
        message:"Interview Report generarted Successfully",
        interviewReport, 
    })
}


module.exports={ generateInterViewReportController}