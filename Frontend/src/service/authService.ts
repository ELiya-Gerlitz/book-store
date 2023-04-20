import axios from "axios";
import UserModel from "../Models/UserModel";
import appConfig from "../Utils/AppConfig";
import CredencialsModel from "../Models/CredencialsModel";
import { AuthActionTypes, AuthStore } from "../Redux/AuthState";


async function register(user: UserModel):Promise<void>{
        const response= await axios.post<string>(appConfig.registerURL, user)
        const token= response.data
        AuthStore.dispatch({type: AuthActionTypes.Register, payload: token})
}

async function login(credentials: CredencialsModel):Promise<void>{
    const response= await axios.post<string>(appConfig.loginURL, credentials)
    const token= response.data
    AuthStore.dispatch({type: AuthActionTypes.Login, payload: token})
}

async function logout():Promise<void>{
    AuthStore.dispatch({type: AuthActionTypes.Logout})
}

export default{
    register,
    login,
     logout
}