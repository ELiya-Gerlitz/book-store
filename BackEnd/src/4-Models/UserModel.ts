import joi from "joi"
class UserModel{
    public userId: number
    public firstName: string
    public lastName: string
    public username: string
    public password: string

    public constructor(user:UserModel){
        this.userId= user.userId
        this.firstName= user.firstName
        this.lastName= user.lastName
        this.username= user.username
        this.password= user.password
    }

    public static validationScheme= joi.object({
        // userId: joi.number(),
        firstName: joi.string().min(2).max(100).required(),
        lastName: joi.string().min(2).max(100).required(),
        username: joi.string().min(2).max(30).required(),
        password: joi.string().min(2).max(19).required()
    })

    public validate():string{
        const result= UserModel.validationScheme.validate(this)
        return result.error?.message
    }

}
export default UserModel