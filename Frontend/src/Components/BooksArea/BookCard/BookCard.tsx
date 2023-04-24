import { NavLink } from "react-router-dom";
import BookModel from "../../../Models/BookModel";
import "./BookCard.css";
import appConfig from "../../../Utils/AppConfig";

interface bookInterface{
    book: BookModel
}

function BookCard(props: bookInterface): JSX.Element {
    return (
        <NavLink to={"/books/"+props.book.bookId}>
        <div className="BookCard Box">

                <div>ID: {props.book.bookId}</div>
                <div>Book Name: {props.book.name}</div>
                <div>Price: {props.book.price}</div>
                <div>Stock: {props.book.stock}</div><br></br>
                <div>genre: {props.book.genreName}</div><br></br>
                <img src={appConfig.imgURL + props.book.imageName} />
        
        </div>
        </NavLink>
    );
}

export default BookCard;
