import { useState } from "react";
import "./Footer.css";

function Footer(): JSX.Element {
const [time, setTime]=useState("")

const date= new Date()
const now= date.toLocaleString()

setTimeout(()=>{
    setTime(now)
}, 1000)
   
    return (
        <div className="Footer">
			{now}
        </div>
    );
}

export default Footer;
