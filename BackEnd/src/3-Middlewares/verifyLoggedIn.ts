import { NextFunction, Request, Response } from "express";
import { AuthorizationErrorModel } from "../4-Models/ErrorModel";
import cyber from "../2-Utils/cyber";

async function verifyLoggedIn(request: Request, response: Response, next: NextFunction){
    try{
        const isLoggedIn= await cyber.isLoggedIn(request)
        if(!isLoggedIn) throw new AuthorizationErrorModel("You must be logged in!")
        next()
    }catch(err:any){
        next(err)
    }
}

export default verifyLoggedIn