import { NavLink } from "react-router-dom";
import "./Menu.css";
import { BookStore } from "../../../Redux/BookState";
import { useEffect, useState } from "react";

function Menu(): JSX.Element {
    const [count, setCount]= useState<number>(0)

    useEffect(()=>{
        setCount(BookStore.getState().books.length)
        const unsubscribe= BookStore.subscribe(()=>{
            setCount(BookStore.getState().books.length)
        })
        return ()=>{
            unsubscribe()
        }

    },[])
 
    return (
        <div className="Menu">
			<NavLink to={"/"}>Home</NavLink>
			<NavLink to={"/books"}>View All Books</NavLink>
            <NavLink to="/books/add">Add new Book</NavLink>
            Book Count: {count}
        </div>
    );
}

export default Menu;
