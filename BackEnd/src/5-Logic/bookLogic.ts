import dal from "../2-Utils/dal";
import BookModel from "../4-Models/BookModel";
import { ResourceNotFoundErrorModel, ValidationErrorModel } from "../4-Models/ErrorModel";
import {OkPacket} from "mysql"
import handleFiles from "../2-Utils/handleFiles";
import cyber from "../2-Utils/cyber";
import fs from "fs"
import fsPromises from "fs/promises"
import path from "path";
import {v4 as uuid} from "uuid"
import GenreModel from "../4-Models/GenreModel";
// import handleFiles from "../2-Utils/handleFiles";


async function getAllBooks():Promise<BookModel[]>{
    const sql=`
    SELECT * FROM books
    `
    const books= await dal.execute(sql)
    return books
}

async function getOneBook(bookId:number):Promise<BookModel>{
    const sql=`
            SELECT *
            FROM books
            WHERE bookId=${bookId}
        `
    const books= await dal.execute(sql)
    const book= books[0]  // überflüßig?
    return book
}

async function postOneBook(book:BookModel):Promise<BookModel>{
    const err= book.validate()
    if(err) throw new ValidationErrorModel(err)
    if(book.image){
        handleFiles(book)
    }
    const sql=`
    INSERT INTO books(name, price, stock, imageName)
    VALUES("${book.name}", ${book.price}, ${book.stock}, "${book.imageName}")

    `
    const info: OkPacket=  await dal.execute(sql)
    book.bookId=info.insertId

    return book
}

// Das war nicht gut. Was hat gefehlt? Des fetches des vorherigen Buch. (! Es nervt mich dass ich das Fehler nich verstehe!)

async function putBook(book: BookModel):Promise<BookModel>{
    const err= book.validate()
    if(err) throw new ValidationErrorModel(err)

    const bookToUpdate = await getOneBook(book.bookId)         
        if(book.image){
           const imagePath= "./src/1-Assets/images/" + bookToUpdate.imageName

        //   await fsPromises.unlink(imagePath) //das wirkt auch gut!
          await fs.unlinkSync(imagePath)

           const extension= path.extname(book.image.name)        
           book.imageName = uuid()+ extension
           await book.image.mv("./src/1-Assets/images/" + book.imageName)
           delete book.image

    }else if(!book.image){
        book.imageName= bookToUpdate.imageName
    }

    const sql=`
    UPDATE books
    SET 
        name = "${book.name}",
        price = ${book.price},
        stock = ${book.stock},
        imageName = "${book.imageName}"
    WHERE bookId= ${book.bookId}
    `
    const info: OkPacket= await dal.execute(sql)
    if(info.affectedRows===0) throw new ResourceNotFoundErrorModel(book.bookId)
    return book
}



async function deleteBook(id: number):Promise<void>{

    const sqlForDeletingImage=`
    SELECT * FROM books
    WHERE bookId= ${id}
    `
    const book :BookModel= await dal.execute(sqlForDeletingImage)
    if(!book) throw new ResourceNotFoundErrorModel(id)

    // handleFiles(book)

    // if (fs.existsSync("./src/1-Assets/images/" + book.imageName)) {
    //     console.log("I exist" + book.imageName)

    //     // Delete it:
    //     fs.unlinkSync("./src/1-Assets/images/" + book.imageName);
    //     console.log("file deleted")
    // }

    const sql=`
    DELETE FROM books
    WHERE bookId= ${id}
    `
    const info :OkPacket= await dal.execute(sql)
    if(info.affectedRows===0) throw new ResourceNotFoundErrorModel(id)
}

//Brauche ich das überhaupt?
async function getAllGenres():Promise<GenreModel[]>{
    const sql=`
    SELECT * FROM genre
    `
    const genres :OkPacket= await dal.execute(sql)
    return genres
}

async function getOneGenre(id: number):Promise<GenreModel>{
    const sql=`
    SELECT * FROM genre
    WHERE genreId=${id}
    `
    const genreNames : OkPacket = await dal.execute(sql)
    const genreName = genreNames[0]
    if(!genreName) throw new ResourceNotFoundErrorModel(id)
    return genreName
}

async function getGenreName(bookId :number):Promise<BookModel>{
    const sql= `
        SELECT books.* , genre.genreName
        FROM genre Join books
        ON genre.genreId = books.genreId
        WHERE books.bookId = ${bookId}
    `
    const info : OkPacket = await dal.execute(sql)
    if(!info) throw new ResourceNotFoundErrorModel(bookId)
    return info
}

export default {
    getAllBooks,
    getOneBook,
    postOneBook,
    putBook,
    deleteBook,
    getAllGenres,
    getOneGenre,
    getGenreName
}