import { useNavigate } from "react-router-dom";
import authService from "../../../service/authService";
import "./Logout.css";
import { useEffect } from "react";

function Logout(): JSX.Element {

const navigate= useNavigate()

useEffect(()=>{

    authService.logout()
    .then(()=>{
        alert("bye bye")
        navigate("/books")
    })
    .catch(err=>console.log(err))
},[])
      
    return  null
}

export default Logout;
