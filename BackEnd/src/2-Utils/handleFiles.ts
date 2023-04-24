import { v4 as uuid } from 'uuid';
import BookModel from "../4-Models/BookModel";
import path from 'path';
import fs from "fs/promises"

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