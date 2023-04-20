import { v4 as uuid } from 'uuid';
import BookModel from "../4-Models/BookModel";
import path from 'path';
import fs from "fs"

// async function handleFiles(book:BookModel):Promise<void>{
//     console.log("Iam in the handleFiles Function")
//     // extract extension 
//     const extension = path.extname(book.image.name)
//     // const extension= book.image.name.substring(book.image.name.lastIndexOf("."))
//     // rename  uuid
//    book.imageName= uuid() +extension

//     // save the image in the backend
//    await book.image.mv("./src/1-Assets/images/"+book.imageName) 
//     // delete

//     delete book.image
// }
// export default handleFiles

async function handleFiles(book:BookModel):Promise<void>{
    console.log("I am the book" +book)

    if(book.image){
        console.log("there is a book.image")

        // delete the old imageName from the Backend-Assets
        console.log("I am the book's imageName" +book.imageName)
        
        if (fs.existsSync("./src/1-Assets/images/" + book.imageName)) {
        // if (fs.existsSync("./src/1-Assets/images/" + book.imageName)) {
            console.log("I exist" + book.imageName)

            // Delete it:
            fs.unlinkSync("./src/1-Assets/images/" + book.imageName);
            console.log("file deleted")
        }
        // extract extension
        const extension=  path.extname(book.image.name)  
        // create a new name uuid
        book.imageName= uuid() +extension
        // save the pic in the backend
        await book.image.mv("./src/1-Assets/images/"+ book.imageName)
        // delete the image
        delete book.image
    }
}

export default handleFiles