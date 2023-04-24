import express, { NextFunction, Request, Response } from "express"
import bookLogic from "../5-Logic/bookLogic"
import BookModel from "../4-Models/BookModel"
import writeMethods from "../2-Utils/writeMethods"
import path from "path"
import verifyLoggedIn from "../3-Middlewares/verifyLoggedIn"

const router= express.Router()

router.get("/books",writeMethods, async( request: Request, response: Response,next: NextFunction)=>{
    try{
        const books= await bookLogic.getAllBooks()
        response.json(books)
    }catch(err:any){
        next(err)
    }
})

router.get("/books/:bookId", writeMethods,  async(request: Request, response: Response,next: NextFunction)=>{
    try{
        const bookId= +request.params.bookId
        const book= await bookLogic.getOneBook(bookId)
        response.json(book)
    }catch(err:any){
        next(err)
    }
})


router.post("/books", verifyLoggedIn, async (request: Request, response: Response, next:NextFunction)=>{
    try{
        request.body.image= request.files?.image
        const book=new BookModel(request.body)
        const addedBook=await bookLogic.postOneBook(book)
        response.status(201).json(addedBook)
    }catch(err:any){
        next(err)
    }
})

router.put("/books/:bookId([0-9]+)", verifyLoggedIn, async(request: Request, response: Response,next: NextFunction)=>{
    try{
        request.body.image= request.files?.image
        request.body.bookId= +request.params.bookId
        const book = new BookModel(request.body)
        const updatedBook = await bookLogic.putBook(book)
        response.status(201).json(updatedBook)
    }catch(err:any){
        next(err)
    }
})
router.delete("/books/:bookId", verifyLoggedIn, async (request: Request, response: Response,next: NextFunction)=>{
    try{
        const bookId= +request.params.bookId
        await bookLogic.deleteBook(bookId)
        response.sendStatus(204)
    }catch(err:any){
        next(err)
    }
})

router.get("/books/images/:imageName", async (request: Request, response: Response,next: NextFunction)=>{
    try{
        let imagename= request.params?.imageName
            const file= path.join(__dirname,"..", "1-Assets", "images" , imagename) 
            response.sendFile(file)
    }catch(err:any){
        next(err)
    }
})

router.get("/genres/", async (request: Request, response: Response,next: NextFunction)=>{
    try{
        const genres = await bookLogic.getAllGenreNames()
        response.json(genres)
    }catch(err:any){
        next(err)
    }
})
router.get("/genres/:genreId", async(request: Request, response: Response,next: NextFunction)=>{
    try{
        const genreId= +request.params.genreId
        const genreName= await bookLogic.getOneGenreName(genreId)
        response.json(genreName)
    }catch(err:any){
        next(err)
    }
})

// copy - wirkt nicht gut
// router.get("/books/images/:imageName", async (request: Request, response: Response,next: NextFunction)=>{
//     try{
//         let imagename= request.params?.imageName
//         if(!request.params.imageName){
//             imagename="defaultBookForThoseWhoDontHaveImageNameInserted.jpg"
//             // const file= path.join(__dirname,"..", "1-Assets", "images" , "defaultBookForThoseWhoDontHaveImageNameInserted.jpg") 
//             const file= path.join(__dirname,"..", "1-Assets", "images" , imagename) 
//             response.sendFile(file)
//         }else{
//             const file= path.join(__dirname,"..", "1-Assets", "images" , imagename) 
//             response.sendFile(file)
//         }


        // const fileName= await bookLogic.getImage(id)
        // const file= `./src/1-Assets/images/${fileName}`
    
        // const file= path.resolve("./src/1-Assets/images/"+ fileName) 
        // response.sendFile(file)
//     }catch(err:any){
//         next(err)
//     }
// })

export default router