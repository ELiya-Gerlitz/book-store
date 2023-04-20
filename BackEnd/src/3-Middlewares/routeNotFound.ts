import { NextFunction, Request, Response } from "express";
import { RouteNotFoundErrorModel } from "../4-Models/ErrorModel";




function routeNotFound(request: Request, response: Response, next: NextFunction){
    const error = new RouteNotFoundErrorModel(request.originalUrl)
    next(error) 
}

export default routeNotFound