import axios from "axios"

const api = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true,
})

export const generateInterviewReport = async ({ selfDescription, jobDescription, resumefile }) => {

    const formData = new FormData();
    formData.append("jobDescription", jobDescription)
    formData.append("selfDescription", selfDescription)
    formData.append("resumefile", resumefile)

    const response=await api.post("/api/interview",formData,{
        headers:{
            "Content-Type":"multipart/form-data"
        }
    })

    return response.data;

}

export const getInterviewReportById=async (interviewId)=>{

    const response =await api.get(`/api/interview/reports/${interviewId}`)


    return response.data

}

export const getAllInterviewReport=async ()=>{

    const response =await api.get(`/api/interview/`)


    return response.data

}