const express=require("express")
const authController=require("../controller/auth.controller.js")
const { authuser }=require("../middlewares/auth.middleware.js")

const authRouter=express.Router()

authRouter.post("/register",authController.registerController)
authRouter.post("/login",authController.loginController)
authRouter.get("/logout",authuser,authController.logoutController)
authRouter.get("/get-me",authuser,authController.getMeController)

module.exports=authRouter;