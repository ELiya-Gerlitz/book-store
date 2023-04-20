import express, { NextFunction, Request , Response} from "express";
import UserModel from "../4-Models/UserModel";
import authLogic from "../5-Logic/auth-logic";
import CredentialsModel from "../4-Models/CredentialsModel";
import verifyLoggedIn from "../3-Middlewares/verifyLoggedIn";

const router= express.Router()

router.post("/auth/register", async(request:Request, response: Response, next:NextFunction)=>{
    try{
        const user= new UserModel(request.body)
        const token= await authLogic.register(user)
        response.json(token)
    }catch(err:any){
        next(err)
    }
})

router.post("/auth/login", async(request:Request, response: Response, next:NextFunction)=>{
    try{
        const credentials= new CredentialsModel(request.body)
        const token= await authLogic.login(credentials)
        response.json(token)
    }catch(err:any){
        next(err)
    }
})
export default router