import { NavLink } from "react-router-dom";
import Register from "../../AuthArea/Register/Register";
import "./Header.css";
import AuthMenu from "../../AuthArea/AuthMenu/AuthMenu";

function Header(): JSX.Element {
    return (
        <div className="Header">
            <h1>Book Store</h1>
          <AuthMenu/>
        </div>
    );
}

export default Header;
