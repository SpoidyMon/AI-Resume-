import { createContext, useState } from "react";


export const InterviewContext=createContext()

export const InterviewProvider=({childeren})=>{

    const [loading, setLoading] = useState(false)
    const [report, setReport] = useState(null)
    const [reports, setReports] = useState([])

    return (
        <InterviewContext.Provider value={{loading,setLoading,report,setReport,reports,setReports}}>
            {childeren}
        </InterviewContext.Provider>
    )
}