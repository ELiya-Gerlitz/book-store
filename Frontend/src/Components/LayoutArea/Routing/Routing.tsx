import { Route, Routes } from "react-router-dom";
import BookListing from "../../BooksArea/BookListing/BookListing";
import HomePage from "../../HomeArea/HomePage/HomePage";
import "./Routing.css";
import SingleBook from "../../BooksArea/SingleBook/SingleBook";
import AddBook from "../../BooksArea/AddBook/AddBook";
import UpdateBook from "../../BooksArea/UpdateBook/UpdateBook";
import Register from "../../AuthArea/Register/Register";
import Preview from "../../BooksArea/Preview/Preview";
import Login from "../../AuthArea/Login/Login";
function Routing(): JSX.Element {
    return (
        <div className="Routing">

            <Routes>
                <Route path="/" element={<HomePage/>} ></Route>
                <Route path="/books" element={<BookListing/>} ></Route>
                <Route path="/books/:bookId" element={<SingleBook/>} ></Route>
                <Route path="/books/add" element={<AddBook />}></Route>
                <Route path="/books/update/:bookId" element={<UpdateBook/>}></Route>
                <Route path="/books/auth/register" element={<Register/>}></Route>
                <Route path="/books/auth/login" element={<Login/>}></Route>
                <Route path="/books/preview" element={<Preview/>}></Route>

            </Routes>
        </div>
    );
}

export default Routing;
