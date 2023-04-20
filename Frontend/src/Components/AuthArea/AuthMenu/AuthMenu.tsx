import { useNavigate } from "react-router-dom";
import "./AuthMenu.css";
import { AuthStore } from "../../../Redux/AuthState";
import UserModel from "../../../Models/UserModel";
import { useEffect, useState } from "react";

function AuthMenu(): JSX.Element {
 const navigate= useNavigate()
 const [user, setUser]=useState<UserModel>()

    useEffect(()=>{
        setUser(AuthStore.getState().user)

        const unsubscribe = AuthStore.subscribe(() =>
         setUser(AuthStore.getState().user)
    )
        return ()=> unsubscribe()
    },[])
    

    return (
        <div className="AuthMenu">

			
        </div>
    );
}

export default AuthMenu;
