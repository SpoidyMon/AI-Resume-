const express=require("express")
const authController=require("../controller/auth.controller.js")
const { authuser, optionalAuthuser }=require("../middlewares/auth.middleware.js")

const authRouter=express.Router()

authRouter.post("/register",authController.registerController)
authRouter.post("/login",authController.loginController)
authRouter.get("/logout",authuser,authController.logoutController)
authRouter.get("/get-me",optionalAuthuser,authController.getMeController)

module.exports=authRouter;