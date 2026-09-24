
import { useContext, useEffect,useState } from 'react'
import { InterviewContext } from '../interview.context'
import { generateInterviewReport, getAllInterviewReport, getInterviewReportById, getResumePdf } from '../Services/interview.api';
import { useParams } from 'react-router';

export const useInterview = () => {

    const context = useContext(InterviewContext);
    const { id: interviewId } = useParams()

    if (!context) {
        throw new Error("useInterview must be with in the Interview Context")
    }

    const { loading, setLoading, reports, setReports, report, setReport } = context

    const generateReport = async ({ selfDescription, jobDescription, resumeFile }) => {
        setLoading(true)
        let response
        try {
            response = await generateInterviewReport({ selfDescription, jobDescription, resumeFile })
            if (response?.interviewReport) {
                setReport(response.interviewReport)
            }
        } catch (error) {
            console.log("Error in gernerate Report Hook" + error)
        } finally {
            setLoading(false)
        }
        return response?.interviewReport ?? null

    }

    const getReportById = async ({ interviewId }) => {
        setLoading(true)
        let response
        try {
            response = await getInterviewReportById(interviewId)
            setReport(response.interviewReport)
        } catch (error) {
            console.log("Error in get report by ID in hook " + error)
        } finally {
            setLoading(false)
        }
    }

    const getReports = async () => {
        setLoading(true)
        let response
        try {
            response = await getAllInterviewReport();
            setReports(response?.interviewReports ?? [])

        } catch (error) {
            console.log("Error in get reports in hook" + error)
        } finally {
            setLoading(false)
        }

    }

    const [downloading, setDownloading] = useState(false)

    const getResumePdfById = async ({ interviewId }) => {
        setDownloading(true)
        let response = null
        try {
            response = await getResumePdf({ interviewId })
            const blob = response instanceof Blob ? response : new Blob([response], { type: "application/pdf" })
            const url = window.URL.createObjectURL(blob)
            const link = document.createElement("a")
            link.href = url
            link.setAttribute("download", `resume_${interviewId}.pdf`)
            document.body.appendChild(link)
            link.click()
            link.remove()
            window.URL.revokeObjectURL(url)
        }
        catch (error) {
            console.error("Error downloading resume:", error)
            alert("Failed to download resume. Please check the backend console.")
        } finally {
            setDownloading(false)
        }

    }
    useEffect(() => {
        if (interviewId) {
            getReportById({ interviewId })
        } else {
            getReports()
        }
    }, [interviewId])


    return { generateReport, getReportById, getReports, report, reports, loading, downloading, getResumePdfById }
}

