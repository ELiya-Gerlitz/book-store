import fsPromises from "fs/promises"
import { NextFunction, Request, Response } from "express";
import path from "path";


async function writeMethods(request:Request, response:Response, next: NextFunction){
    // const pathToWriteIn=  path.resolve(`neu.txt`) //- creates it in the src folder.  
    // const pathToWriteIn=  path.resolve(`./src/6-Controllers/neu2.txt`) // -creates it in the controllers folder.
    // const pathToWriteIn=  `./src/6-Controllers/neu2.txt` //- creates it in the controllers folder
    const pathToWriteIn=  `./src/neu2.txt` //- creates it in the src folder
    const contents= `Method: ${request.method} Directory: ${request.originalUrl}\n`
    await fsPromises.appendFile( pathToWriteIn,contents)
    next()

}
export default writeMethods