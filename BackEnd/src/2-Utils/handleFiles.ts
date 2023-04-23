import { v4 as uuid } from 'uuid';
import BookModel from "../4-Models/BookModel";
import path from 'path';
import fs from "fs/promises"

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
    if(book.image){
        const imageToDelete="./src/1-Assets/images/" + book.imageName
        fs.unlink(imageToDelete);
    }
        const extension=  path.extname(book.image.name)  
        book.imageName= uuid() +extension
        await book.image.mv("./src/1-Assets/images/"+ book.imageName)
        delete book.image
}

export default handleFiles