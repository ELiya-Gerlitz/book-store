import { useForm } from "react-hook-form";
import "./UpdateBook.css";
import BookService from "../../../service/BookService";
import { useNavigate, useParams } from "react-router-dom";
import BookModel from "../../../Models/BookModel";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import appConfig from "../../../Utils/AppConfig";
import GenreModel from "../../../Models/GenreModel";

function UpdateBook(): JSX.Element {
    const { register, setValue, handleSubmit } = useForm<BookModel>();
    const [book, setBook]=useState<BookModel>()
    const [genre, setGenre]=useState<GenreModel[]>([])
    const params= useParams()
    const navigate= useNavigate()
    const id= +params.bookId

useEffect(()=>{
    const id= +params.bookId
    BookService.getOneBookPlusExtensions(id)
    .then((book)=>{
        setValue("bookId", book.bookId)
        setValue("name", book.name)
        setValue("price", book.price)
        setValue("stock", book.stock)
        setValue("imageName", book.imageName)
        setValue("genreId", book.genreId)
        setValue("genreName", book.genreName)
        setBook(book)
        console.log(book.bookId)
        console.log(book.imageName)
    })
    .catch((err:any)=>{console.log(err)})
},[])

useEffect(()=>{
    BookService.getAllGenres()
    .then(genre=>{
        setGenre(genre)
    })
    .catch(err=>console.log(err))
})

// const handleChange = (e: any) => {
//     book.genreId = e.target.value

    
// }

const send= (data:BookModel)=>{
    BookService.updateBook(data)
    .then(()=>{
        // alert("successfully altered")
        navigate("/books")
    })
    .catch((err:any)=>{console.log(err)})
}
    
    return (
        <div className="UpdateBook">
            <div className="Box">
                {book && 
                    <form onSubmit={handleSubmit(send)}>
                        <input hidden type="number" {...register("bookId")}/>

                        <label >Book Name</label>
                        <input type="text"  {...register("name")}/>

                        <label >price</label>
                        <input type="number" {...register("price")}/>

                        <label htmlFor="stock">stock</label>
                        <input type="number"   {...register("stock")}/>

                        <input type="text" hidden  {...register("genreName")}/>


                        <select name="updateSelect" {...register("genreId")} required>
                            {genre && genre.map((g)=><option key={g.genreId} value={g.genreId}>{g.genreName}</option>)}
                        </select>
                                                                    
                        <div className="Container">
                                <input type="file" className="InputFile" {...register("image")}/>
                                <div className="Overlay">change image</div> 
                                {book && 
                                <div className="imageBox"><img alt="bookfileimage" src={appConfig.imgURL + book.imageName}/></div>}
                        </div>

                        <br></br><input type="submit" value={"update book"}/>
                </form >
                }
            </div>

            <br></br> <NavLink to={"/books/"+ id}>Back</NavLink>
        </div>
    );
}

export default UpdateBook;