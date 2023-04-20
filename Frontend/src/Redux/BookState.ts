import { createStore } from "redux"
import BookModel from "../Models/BookModel"

export class BookState{
    public books: BookModel[]=[];
}

export enum BookActionTypes{
    FetchAllBooks,
    AddBook,
    UpdateBook,
    DeleteBook
}

export interface BookActions{
    type: BookActionTypes
    payload: any
}

export function BookReducer(currentState= new BookState(), action: BookActions):BookState{
   const newState= {...currentState}
   switch (action.type){

    case BookActionTypes.FetchAllBooks:
        newState.books = action.payload
        break

    case BookActionTypes.AddBook:
        newState.books.push(action.payload)
        break

    case BookActionTypes.UpdateBook:
        let updatedBookIndex= newState.books.findIndex(b=>b.bookId===action.payload.bookId)        //new details about one book
        if(updatedBookIndex > 0){
            newState.books[updatedBookIndex]= action.payload
        }
        break

    case BookActionTypes.DeleteBook:
        let indexToDelete= newState.books.findIndex(b=>b.bookId===action.payload)        
        if(indexToDelete>0){
            newState.books.splice(indexToDelete, 1)
        }
   }

   return newState
}

export const BookStore= createStore(BookReducer)