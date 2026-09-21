
import  { useContext } from 'react'
import { InterviewContext } from '../interview.context'
import { generateInterviewReport, getInterviewReportById } from '../Services/interview.api';
import { useParams } from 'react-router';

const useInterview = () => {

    const context = useContext(InterviewContext);
    const { interviewId } = useParams()

    if (!context) {
        throw new Error("useInterview must be with in the Interview Context")
    }

    const { loading, setLoading, reports, setReports, report, setReport } = context

    const generateReport = async ({ selfDescription, jobDescription, resumefile }) => {
        setLoading(false)
        let response
        try {
            response = await generateInterviewReport({ selfDescription, jobDescription, resumefile })
            setReport(response.interviewReport)
        } catch (error) {
            console.log("Error in gernerate Report Hook" + error)
        } finally {
            setLoading(true)
        }
        return response.interviewReport

    }

    const getReportById = async ({ interviewId }) => {
        setLoading(false)
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
        setLoading(false)
        let response
        try {
            response = await getReports();
            setReports(response.interviewReports)
            
        } catch (error) {
            console.log("Error in get reports in hook" + error)
        } finally {
            setLoading(true)
        }

    }

    return { generateReport, getReportById,getReports, report, reports, loading }
}

export default useInterview
