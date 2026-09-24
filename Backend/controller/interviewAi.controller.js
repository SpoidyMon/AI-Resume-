const pdfParse=require("pdf-parse")
const path=require("path")
const { pathToFileURL }=require("url")
const { generateInterviewReport, generateResumePdf } = require('../Services/api.service')
const interviewReportModel=require("../model/interviewReport.model")

const generateInterViewReportController=async(req,res)=>{
    const {selfDescription,jobDescription} = req.body;
    let resumeText = "";

    if (req.file) {
        const parser = new pdfParse.PDFParse({
            data: Uint8Array.from(req.file.buffer),
            standardFontDataUrl: pathToFileURL(
                path.join(__dirname, "../node_modules/pdfjs-dist/standard_fonts/")
            ).href
        })
        const resumeContent = await parser.getText()
        resumeText = resumeContent.text;
    }

    if (!jobDescription || (!resumeText && !selfDescription)) {
        return res.status(400).json({
            message:"Job description and a resume or self-description are required"
        })
    }

    const interviewReportByAi=await generateInterviewReport({
        resume:resumeText,
        selfDescription,
        jobDescription,
    })

    const interviewReport=await interviewReportModel.create({
        user:req.user.id,
        resume:resumeText,
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
    
    const interviewReportById=await interviewReportModel.findOne({_id:interviewId,user:req.user.id})

    if(!interviewReportById){
        return res.status(404).json({
            message:"Interview report Not found"
        })
    }

    res.status(200).json({
        message:"Interview Report found successfully",
        interviewReport: interviewReportById,
    })

}

const getAllInterViewController=async(req,res)=>{
    const interviewReports=await interviewReportModel.find({user:req.user.id}).sort({ createdAt: -1 }).select("-resume -selfDescription -jobDescription -__v -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan")

    res.status(200).json({
        message:"All reports fetched successfully",
        interviewReports
    })

}

const generateResumePdfController=async(req,res)=>{
    try {
        const {interviewId} = req.params;

        const interviewReport = await interviewReportModel.findOne({
            _id: interviewId,
            user: req.user.id,
        });

        if(!interviewReport){
            return res.status(404).json({
                message:"Interview not found",
            })
        }

        const {resume,selfDescription,jobDescription}=interviewReport;
        const pdfbuffer=await generateResumePdf({resume,selfDescription,jobDescription});

        res.set({
            "Content-Type": "application/pdf",
            "Content-Disposition": `attachment; filename=resume_${interviewId}.pdf`
        })

        return res.send(pdfbuffer);
    } catch (error) {
        console.error("Error generating resume PDF:", error);
        return res.status(500).json({
            message:"Unable to generate resume PDF"
        })
    }

}

module.exports={ generateInterViewReportController,getAllInterViewController,getInterViewByIdController,generateResumePdfController}