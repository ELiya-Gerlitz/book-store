class UserModel{
        public userId: number
        public firstName: string
        public lastName: string
        public username: string
        public password: string
    
 public static firstNameValidation= {
        required: {value: true, message: "firstName is required"},
        minLength: {value: 2, message: "at least 2 characters required!"},
        maxlength: {value: 100, message: "not over 100 characters!"},
 }

 public static lastNameValidation={
        required: {value: true, message: "last Name required!"},
        minLength: {value: 2, message: "at least 2 characters required!"},
        maxLength: {value: 100, message: "not over 100 characters!"},
 }

 public static usernameValidation={
        required:{value: true, message: "username required!"},
        minLength:{value: 3, message: "username has to be longer than 2 characters!"},
        maxLength:{value: 15, message: "too long username!"},
 }

 public static passwordValidation={
        required:{value: true, message: "password required!"},
        minLength:{value: 3, message: "password has to be longer than 2 characters!"},
        maxLength:{value: 25, message: "too long password!"},
 }
}

export default UserModel