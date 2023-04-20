import { UploadedFile } from "express-fileupload"
import joi from "joi"

class BookModel{
    public bookId: number
    public name: string
    public price: number
    public stock: number
    public image: UploadedFile
    public imageName: string
    constructor(book:BookModel){
        this.bookId=book.bookId
        this.name= book.name
        this.price= book.price
        this.stock= book.stock
        this.image= book.image
        this.imageName= book.imageName
    }

    public static validationSchema= joi.object({
        bookId: joi.number().positive().optional(),
        name: joi.string().min(2).max(100).required(),
        price: joi.number(),
        stock: joi.number().min(1).max(1000).required().positive(),
        image: joi.optional(),
        imageName: joi.optional()
    })


    public validate(){
        const result= BookModel.validationSchema.validate(this)
        return result.error?.message
    }
}

export default BookModel