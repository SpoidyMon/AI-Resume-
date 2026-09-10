const User=require("../model/user.model.js")
const blackListedModel=require("../model/blackListedToken.model.js")
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")

const sanitizeUser = (user) => ({
    _id: user._id,
    username: user.username,
    email: user.email,
})

const registerController=async(req,res)=>{
    const {username,password, email}=req.body

    if(!username || !password || !email){
        return res.status(400).json({
            message:"Credentials required to register to System"
        })
    }

    const userExist=await User.findOne({$or:[{username},{email}]})

    if(userExist){
        return res.status(409).json({
            message:"Username or email already exists"
        })
    }

    const hashPassword= await bcrypt.hash(password,10);

    const newUser=await User.create({username,password:hashPassword,email})

    const token=jwt.sign(
        {id:newUser._id,username:newUser.username},
        process.env.JWT_SECRET,
        { expiresIn:"1d"}
    )

    res.cookie("token", token, {
        httpOnly: true,
        sameSite: "strict"
    })

    return res.status(201).json({
        message:"User registered successfully",
        user: sanitizeUser(newUser)
    })
}

const loginController=async (req,res)=>{
    const {email,password}=req.body;

    if(!email || !password){
        return res.status(400).json({message:"Email and Password required to Login"})
    }

    const registeredUser=await User.findOne({email})
    if(!registeredUser){
        return res.status(401).json({message:"Invalid Credentials"})
    }

    const isPasswordValid=await bcrypt.compare(password,registeredUser.password);
    if(!isPasswordValid){
        return res.status(401).json({message:"Invalid Credentials"})
    }

    const token=jwt.sign(
        {id:registeredUser._id,username:registeredUser.username},
        process.env.JWT_SECRET,
        { expiresIn:"1d"}
    )

    res.cookie("token", token, {
        httpOnly: true,
        sameSite: "strict"
    })

    return res.status(200).json({
        message:"User LoggedIn Successfully",
        user: sanitizeUser(registeredUser)
    })

}

const logoutController=async(req,res)=>{
    const token = req.cookies?.token;

    if(token){
        await blackListedModel.create({token});
    }

    res.clearCookie("token");

    return res.status(200).json({
        message:"User logout succesfully",
    })
}
const getMeController=async(req,res)=>{
    const user = await User.findById(req.user.id)

    return res.status(200).json({
        message:"User data fetched succesfully",
        user:sanitizeUser(user)
    })
}


module.exports={registerController,loginController,logoutController,getMeController}