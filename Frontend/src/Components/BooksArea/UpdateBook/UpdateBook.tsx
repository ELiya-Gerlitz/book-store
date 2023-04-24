import { useForm } from "react-hook-form";

import "./UpdateBook.css";
import BookService from "../../../service/BookService";
import { useNavigate, useParams } from "react-router-dom";
import BookModel from "../../../Models/BookModel";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import appConfig from "../../../Utils/AppConfig";

function UpdateBook(): JSX.Element {

    const { register, setValue, handleSubmit } = useForm<BookModel>();
    const [book, setBook]=useState<BookModel>()
    const params= useParams()
    const id= +params.bookId
    const navigate= useNavigate()
    
useEffect(()=>{
    BookService.getOneBookPlusExtensions(id)
    .then((book)=>{
        setValue("bookId", book.bookId)
        setValue("name", book.name)
        setValue("price", book.price)
        setValue("stock", book.stock)
        setValue("genreName", book.genreName)
        setValue("imageName", book.imageName)
        setBook(book)
        console.log(book.bookId)
        console.log(book.imageName)
    })
    .catch((err:any)=>{console.log(err)})
},[])


const send= (data:BookModel)=>{
    BookService.updateBook(data)
    .then(()=>{
        alert("successfully altered")
        navigate("/books")
    })
    .catch((err:any)=>{console.log(err)})
}
    
    return (
        <div className="UpdateBook">
            <div className="Box">
                    <form onSubmit={handleSubmit(send)}>
                        <input hidden type="number" {...register("bookId")}/>

                        <label >Book Name</label>
                        <input type="text"  {...register("name")}/>

                        <label >price</label>
                        <input type="number" {...register("price")}/>

                        <label htmlFor="stock">stock</label>
                        <input type="number"   {...register("stock")}/>

                        <label htmlFor="genreName">stock</label>
                        <input type="string"   {...register("genreName")}/>

                        <input type="text" {...register("imageName")}/>
                                                
                            <div className="Container">
                                    <input type="file" className="InputFile" {...register("image")}/>
                                    <div className="Overlay">change image</div> 
                                    {book && 
                                    <div className="imageBox"><img alt="bookfileimage" src={appConfig.imgURL + book.imageName}/></div>
                                        }
                            </div>

                        <br></br><input type="submit" value={"update book"}/>
                </form >
            </div>

            <br></br> <NavLink to={"/books/"+ id}>Back</NavLink>
        </div>
    );
}

export default UpdateBook;