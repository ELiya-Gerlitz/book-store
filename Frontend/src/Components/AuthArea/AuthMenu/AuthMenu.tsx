import { NavLink, useNavigate } from "react-router-dom";
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
    
    const handleLogout = () => {

    }

    return (
        <div className="AuthMenu">
            <NavLink to={"/books/auth/register"}>register </NavLink> |   
            <NavLink to={"/books/auth/login"}> login </NavLink> |   
            <NavLink to={"#"} onClick={handleLogout}> logout</NavLink>
        </div>
    );
}

export default AuthMenu;
