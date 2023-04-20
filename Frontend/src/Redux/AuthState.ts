import {createStore} from "redux"
import UserModel from "../Models/UserModel";
import jwtDecode from "jwt-decode";

export class AuthState{
    public token: string = null
    public user: UserModel = null

    public constructor(){
        this.token= sessionStorage.getItem("token")
        if(this.token){
           const container: {user: UserModel}= jwtDecode(this.token)
           this.user= container.user
        }
    }
}

export enum AuthActionTypes{
    Register,
    Login,
    Logout
}

export interface AuthActions{
    type: AuthActionTypes
    payload?:  string
}

export function AuthReducer(currentState=new AuthState(), action: AuthActions):AuthState{
    const newState= {...currentState}
    switch(action.type){
        case AuthActionTypes.Register:
        case AuthActionTypes.Login:
            newState.token= action.payload
            const container: {user: UserModel} = jwtDecode(newState.token)
            newState.user = container.user
            sessionStorage.setItem("token", newState.token)

            break
           
        case AuthActionTypes.Logout:
            newState.token = null
            newState.user = null
            sessionStorage.removeItem("token")
    }

    return newState 
}

export const AuthStore = createStore(AuthReducer)