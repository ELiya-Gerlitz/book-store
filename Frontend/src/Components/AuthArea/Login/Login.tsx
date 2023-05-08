import { useForm } from "react-hook-form";
import "./Login.css";
import CredentialsModel from "../../../Models/CredencialsModel";
import { useNavigate } from "react-router-dom";
import authService from "../../../service/authService";
import { AuthStore } from "../../../Redux/AuthState";

function Login(): JSX.Element {
        const { handleSubmit, register } = useForm<CredentialsModel>()
        const navigate = useNavigate();
    
        const send = (data: CredentialsModel) => {
            if(AuthStore.getState().token){
                alert("you are already logged in!")
            }
            authService.login(data)
                .then(() => { console.log("successfully logged in"); navigate("/books") })
                .catch(err => console.log(err))
        }

    return (
        <div className="Login">
            <h3>Login</h3>
			 <form onSubmit={handleSubmit(send)}>
                <input type="text" placeholder="username" {...register('username', CredentialsModel.usernameValidation)} />
                <input type="password" placeholder="password" {...register('password', CredentialsModel.passwordValidation)} />
                <button>login</button>
            </form>
        </div>
    );
}

export default Login;
