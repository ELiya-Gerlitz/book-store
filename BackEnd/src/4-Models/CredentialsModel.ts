import joi from "joi"
class CredentialsModel{
    public username: string
    public password: string

    public constructor(Credentials:CredentialsModel){
        this.username= Credentials.username
        this.password= Credentials.password
    }

    public static validationScheme= joi.object({
        username: joi.string().min(2).max(30).required(),
        password: joi.string().min(2).max(19).required()
    })

    public validate():string{
        const result= CredentialsModel.validationScheme.validate(this)
        return result.error?.message
    }
}
export default CredentialsModel