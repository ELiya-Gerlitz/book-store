import { useState, useEffect } from "react";
import BookModel from "../../../Models/BookModel";
import BookService from "../../../service/BookService";
import "./BookListing.css";
import BookCard from "../BookCard/BookCard";
import { BookStore } from "../../../Redux/BookState";
import GenreModel from "../../../Models/GenreModel";

function BookListing(): JSX.Element {
    const [books, setBooks] = useState<BookModel[]>([])
    const [genres , setGenres] = useState<GenreModel[]>([])

useEffect(()=>{
    BookService.getAllGenres()
    .then(genres=> setGenres(genres))
    .catch((err:any)=>{console.log(err)})
})

    useEffect(() => {
        BookService.getAllBooks()
            .then(books => {
                setBooks(books)
                console.log("before" + books)
                BookStore.subscribe(() => {setBooks(books); console.log("after" + books)})
            })
            .catch(err => console.log(err))
    }, [])

    return (
        <div className="BookListing">
            {books.length === 0 ? <span>i am bookListing</span> : books.map(b => <BookCard key={b.bookId} book={b} />)}
        </div>
    );
}

export default BookListing;
