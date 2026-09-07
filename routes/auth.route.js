const express=require("express")
const authController=require("../controller/auth.controller.js")


const authRouter=express.Router()

authRouter.post("/register",authController.registerController)
authRouter.post("/login",authController.loginController)
authRouter.post("/logout",authController.loginController)
authRouter.post("/get-me",authController.loginController)

module.exports=authRouter;