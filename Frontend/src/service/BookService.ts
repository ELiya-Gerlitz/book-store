import axios from "axios";
import BookModel from "../Models/BookModel";
import appConfig from "../Utils/AppConfig";
import { BookActionTypes, BookStore } from "../Redux/BookState";
import { AuthStore } from "../Redux/AuthState";
import GenreModel from "../Models/GenreModel";


async function getAllBooks(): Promise<BookModel[]> {

    let books = BookStore.getState().books;
    if (books.length === 0) {
        const response = await axios.get<BookModel[]>(appConfig.AllBooksURL);
        books = response.data;
        BookStore.dispatch({ type: BookActionTypes.FetchAllBooks, payload: books });
    }
    return books;
}

async function getOneBook(bookId: number): Promise<BookModel> {

    let books= BookStore.getState().books
    let book= books.find(b=>b.bookId===bookId)
    if(!book){
    const response = await axios.get<BookModel>(appConfig.AllBooksURL + bookId)
    book = response.data
    }
    return book
}

async function postOneBook(book: BookModel): Promise<void> {

    const headers = { authorization: "Bearer " + AuthStore.getState().token}

    const myForm = new FormData()
    myForm.append("name", book.name)
    myForm.append("price", book.price.toString())
    myForm.append("stock", book.stock.toString())
    myForm.append("image", book.image[0])
    const response = await axios.post<BookModel>(appConfig.AllBooksURL, myForm, { headers })
    const newBook = response.data
    BookStore.dispatch({type: BookActionTypes.AddBook, payload: newBook})
}

async function updateBook(book: BookModel): Promise<void> {

    const myForm = new FormData()
    myForm.append("name", book.name)
    myForm.append("price", book.price.toString())
    myForm.append("stock", book.stock.toString())
    myForm.append("image", book.image[0])
    const response = await axios.put<BookModel>(appConfig.AllBooksURL + book.bookId, myForm, {headers: {authorization: "Bearer " + AuthStore.getState().token } })
    const updatedBook = response.data
    BookStore.dispatch({type: BookActionTypes.UpdateBook, payload: updatedBook})

}

async function deleteBook(id: number): Promise<void> {

    await axios.delete<void>(appConfig.AllBooksURL + id, { headers: { authorization: "Bearer " + AuthStore.getState().token } })
    BookStore.dispatch({type: BookActionTypes.DeleteBook, payload: id})
}
async function getAllGenres():Promise<GenreModel[]>{
    let genres= BookStore.getState().genres
    if(genres.length===0){
        const response = await axios.get<GenreModel[]>(appConfig.genresURL)
        genres= response.data
        BookStore.dispatch({type : BookActionTypes.getAllGenres, payload: genres})
    }
    return genres
}

async function getOneGenre(id: number):Promise<GenreModel>{
    let genres = BookStore.getState().genres
    let index = genres.findIndex(g=> g.genreId ===id)
    let genre = genres[index]
    if(index < -1){
        const response= await axios.get<GenreModel>(appConfig.genresURL+ id)
        genre= response.data
    }
    return genre
}

export default {
    getAllBooks,
    getOneBook,
    postOneBook,
    updateBook,
    deleteBook,
    getAllGenres,
    getOneGenre
}