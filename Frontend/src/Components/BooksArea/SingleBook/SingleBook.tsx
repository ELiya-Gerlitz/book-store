import { useNavigate, useParams } from "react-router-dom";
import "./SingleBook.css";
import BookService from "../../../service/BookService";
import { useEffect, useState } from "react";
import BookModel from "../../../Models/BookModel";
import { NavLink } from "react-router-dom";
import ModalExample from "../ModalExample/ModalExample";
import appConfig from "../../../Utils/AppConfig";

function SingleBook(): JSX.Element {

const params = useParams();
const [book, setBook] = useState<BookModel>();
const id = +params.bookId

useEffect(() => {
    const id = +params.bookId; 
    BookService.getOneBook(id)
        .then(book => console.log(setBook(book)))
        .catch(err => console.log(err));
}, []);

    return (
      
        <div className="SingleBook">
              <NavLink to={"/books/"} className="Box">
            {book&&
                <>
                    <div> ID: {book.bookId}</div>
                    <div>Name: {book.name}</div>
                    <div>Price: {book.price}</div>
                    <div>Stock: {book.stock}</div>
                    <img src={appConfig.imgURL + book.imageName}/>
                </>
            }
             </NavLink>
             <div><NavLink to={"/books/update/"+params.bookId}>Update Book</NavLink></div>
             <ModalExample id={book?.bookId}/>
        </div>
       
    );
}

export default SingleBook;
