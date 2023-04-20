import { NavLink } from "react-router-dom";
import Register from "../../AuthArea/Register/Register";
import "./Header.css";

function Header(): JSX.Element {
    return (
        <div className="Header">
            <NavLink to={"/books/auth/register"}>register</NavLink>
            <NavLink to={"/books/auth/login"}>login</NavLink>
        </div>
    );
}

export default Header;
