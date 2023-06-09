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
const id = +params.bookId; 


useEffect(() => {
    const id = +params.bookId; 
    BookService.getOneBookPlusExtensions(id)
        .then(book => setBook(book))
        .catch(err => console.log(err));
}, []);

    return (
      
        <div className="SingleBook">
              <NavLink to={"/books/"} className="Box">
                {!book && <span>I am not yet ready</span>}
            {book &&
                <>
                    <div> ID: {book.bookId}</div>
                    <div>Name: {book.name}</div>
                    <div>Price: {book.price}</div>
                    <div>Stock: {book.stock}</div>
                    <div>genreName: {book.genreName}</div>
                    <img src={appConfig.imgURL + book.imageName} alt="singleBookImg"/>
                </>
            }
             </NavLink>
             <div><NavLink to={"/books/update/"+params.bookId}>Update Book</NavLink></div>
             <ModalExample id={book?.bookId}/>
        </div>
       
    );
}

export default SingleBook;
