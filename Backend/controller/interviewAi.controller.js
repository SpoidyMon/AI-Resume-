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


const getInterViewByIdController=async(req,res)=>{
    const {interviewId} =req.params
    
    const interviewReportById=await interviewReportModel.find({_id:interviewId,user:req.user.id})

    if(!interviewReportById){
        return res.status(404).json({
            message:"Interview report Not found"
        })
    }

    res.status(200).json({
        message:"Interview Report found successfully",
        interviewReportById,
    })

}

const getAllInterViewController=async(req,res)=>{
    const interviewReports=await interviewReportModel.find({user:req.user.id}).sort({ createdAt: -1 }).select("-resume -selfDescription -jobDescription -__v -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan")

    res.status(200).json({
        message:"All reports fetched successfully",
        interviewReports
    })

}

module.exports={ generateInterViewReportController,getAllInterViewController,getInterViewByIdController}