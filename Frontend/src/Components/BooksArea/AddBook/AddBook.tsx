import { useForm } from "react-hook-form";
import BookService from "../../../service/BookService";
import "./AddBook.css";
import BookModel from "../../../Models/BookModel";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import GenreModel from "../../../Models/GenreModel";

function AddBook(): JSX.Element {
    const {register, handleSubmit}= useForm<BookModel>()
    const navigate= useNavigate()
    // const [preview, setPreview] = useState()
    const [selectedImage, setSelectedImage] = useState();
    const [genre, setGenre] = useState<GenreModel[]>();
    const [svalue, setSvalue] = useState<number>();
    // const [text, setText] = useState<string>();
   

// const handleSelectChange = (e : any)=>{ //wirkt nicht...
//     setSvalue(e.target)
//     console.log("target: "+ svalue)
// }

     const send= (data:BookModel)=>{
            data.genreName = "thriller"
            BookService.postOneBook(data)
            .then(()=>{
                console.log("book successfully added!")
                navigate("/books")
            })
            .catch(err=> console.log(err))
    }

    useEffect(()=>{
        BookService.getAllGenres()
        .then(genre=>setGenre(genre))
        .catch(err=>console.log(err))
    })
    // trial 

    // const renderPreview= (e:any) => {
    //     if(e.target.files && e.target.files.length > 0) {
    //         setPreview(e.target.files[0])
    //     }
    // }

      
    // This function will be triggered when the file field changes
    const imageChange = (e:any) => {
        if (e.target.files && e.target.files.length > 0) {
          setSelectedImage(e.target.files.value[0]);
        }
      };


    return (
        <div className="AddBook Box">
			i am add book
            <form onSubmit={handleSubmit(send)}>
                <input type="text" placeholder="book name" {...register("name")}/>
                <input type="number" placeholder="price" {...register("price")}/>
                <input type="number" placeholder="stock" {...register("stock")}/>
                <select name="postSelect" {...register("genreId")}>
                    {genre && genre.map(g=> <option key={g.genreId} value={g.genreId}>{g.genreName}</option> )}
                </select>
               
                {/* <div>
                <input type="file" accept="image/*"  onChange={renderPreview} {...register("image")}/>  
                {preview && <div><img src={URL.createObjectURL(preview)} alt="previewImage"/></div>}
                </div> */}
                
                <div >
          <input accept="image/*" type="file" onChange={imageChange} {...register("image")}/>

          {/* {selectedImage &&  (<div ><p>{URL.createObjectURL(selectedImage)}</p></div>)}    // This (URL.createObjectURL) sets it as a url- string, rather than a File... */}
          {selectedImage &&  <div ><img src={URL.createObjectURL(selectedImage)} alt="PreviewImage"/></div>}
        </div>
            
                <button>add Book</button>
            </form>
        </div>
    );

}



export default AddBook;
