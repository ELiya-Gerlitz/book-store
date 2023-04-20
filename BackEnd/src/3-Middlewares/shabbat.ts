import { NextFunction, Request, Response } from "express";

function Shabbat(request:Request, response: Response, next: NextFunction){
    const date= new Date()
    const day= date.getDay()+1
    if(day===7){
        // next("shabbbbat")
        response.status(400).send("shabbat")       
        return
    }
    next()
}

export default Shabbat