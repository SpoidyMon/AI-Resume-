const jwt = require("jsonwebtoken");
const blackListedModel=require("../model/blackListedToken.model.js")

const authuser=async (req,res,next)=>{

    const token=req.cookies?.token;

    if(!token){
        return res.status(401).json({
            message:"Token not provided"
    })
    }

    const isTokenBlacklisted=await blackListedModel.findOne({token})

    if(isTokenBlacklisted){
        return res.status(401).json({
            message:"Token is invalid"
        })
    }

    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET);

        req.user=decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            message:"Invalid Token "
        })
    }

}

module.exports={ authuser }