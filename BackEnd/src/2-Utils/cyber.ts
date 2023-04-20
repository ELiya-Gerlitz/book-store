import { Request } from "express";
import jwt from "jsonwebtoken"
import { AuthorizationErrorModel } from "../4-Models/ErrorModel";
import UserModel from "../4-Models/UserModel";
import { options } from "joi";

const secretKey= "patzkareshet@!"

function createToken(user:UserModel):Promise<string>{

    const container={user}
    const options= {expiresIn : "3h"}
    const token= jwt.sign(container, secretKey, options)
    return token

}


function isLoggedIn(request:Request):Promise<boolean>{
    return new Promise<boolean>((resolve,reject)=>{
        try{
            const header= request.headers.authorization
            if(!header) {
                console.log("there is no header!")
                resolve(false)
                return
            }
            // const token= header.split("")[1] // same as :   const token= header.substring(7)
            const token= header.substring(7)
            if(!token){
                resolve(false)
                return
            }

            jwt.verify(token, secretKey, err=>{
                if(err){
                    resolve(false)
                    return
                }
                resolve(true)
            })
            
        }catch(err:any){
        reject(err)
        }
    })
   
}

export default {
    isLoggedIn,
    createToken
}