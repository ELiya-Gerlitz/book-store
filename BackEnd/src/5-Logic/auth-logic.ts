import cyber from "../2-Utils/cyber"
import dal from "../2-Utils/dal"
import CredentialsModel from "../4-Models/CredentialsModel"
import { AuthorizationErrorModel, ValidationErrorModel } from "../4-Models/ErrorModel"
import UserModel from "../4-Models/UserModel"
import OkPacket from "mysql"



async function register(user:UserModel):Promise<string>{
    console.log("I am the beginning of authLogic")
    const err= user.validate()
    if(!err) throw new ValidationErrorModel(err)

    // check whether userName is already taken.
    const sql=`
        SELECT * FROM users
        WHERE username= "${user.username}"
    `
    const usernameTaken : OkPacket= await dal.execute(sql)

    if(usernameTaken.affectedRows>0) throw new ValidationErrorModel("username is already in use!")

    // save the new user in the DB
    const sql2save=`
        INSERT INTO users(firstName, lastName, username, password)
        VALUES ("${user.firstName}", "${user.lastName}", "${user.username}", "${user.password}") 
    `
    const info: OkPacket= await dal.execute(sql2save)
    user.userId=info.insertId

    const token= await cyber.createToken(user)
    return token
}

async function login(credentials: CredentialsModel):Promise<string>{

    const err= credentials.validate()
    if(err) throw new ValidationErrorModel(err)


     // get all users and see whether the userName && password exist.
     const sql=`
     SELECT * FROM users
     WHERE username = "credentials.username" AND password = "credentials.password";
     `
     const passwordUsernameExist= await dal.execute(sql)
     console.log(passwordUsernameExist)
     if(!passwordUsernameExist) throw new ValidationErrorModel("Please register!")

    const token= cyber.createToken(passwordUsernameExist)
    return token
}

export default {
    register,
    login
}