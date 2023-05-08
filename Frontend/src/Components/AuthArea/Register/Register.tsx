import { useForm } from "react-hook-form";
import "./Register.css";
import authService from "../../../service/authService";
import UserModel from "../../../Models/UserModel";
import { useNavigate } from "react-router-dom";
import { AuthStore } from "../../../Redux/AuthState";

function Register(): JSX.Element {
    const { handleSubmit, register } = useForm<UserModel>()
    const navigate = useNavigate();

    const send = (data: UserModel) => {
            if(AuthStore.getState().token){
                alert("you are already logged in!")
            }else{
                authService.register(data)
                .then(() => { console.log("successfully logged in"); navigate("/books") })
                .catch(err => console.log(err))
            }
    }


    return (
        <div className="Register Box">
            <form onSubmit={handleSubmit(send)}>
                <input type="text" placeholder="firstName" {...register('firstName', UserModel.firstNameValidation)} />
                <input type="text" placeholder="lastName" {...register('lastName', UserModel.lastNameValidation)} />
                <input type="text" placeholder="username" {...register('username', UserModel.usernameValidation)} />
                <input type="password" placeholder="password" {...register('password', UserModel.passwordValidation)} />
                <button>register</button>
            </form>

        </div>
    );
}

export default Register;
