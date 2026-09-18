const {GoogleGenAI} =require("@google/genai")
const { model } = require("mongoose")

const ai = new GoogleGenAI({
    apikey: process.env.GEMINI_API_KEY
})

async function invokeGemini() {
    
    const response= await ai.models.generateContent({
        model:"gemini-2.5-flash",
        contents:"Hello Gemini, Explain whats GenAI"
    })

    console.log(response.text)
}

module.exports=invokeGemini;