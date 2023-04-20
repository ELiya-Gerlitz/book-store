import { useState } from "react";
import "./Preview.css";

// With Courtesy from Kindacode.com // https://www.kindacode.com/article/react-show-image-preview-before-uploading/

function Preview(): JSX.Element {
    const [selectedImage, setSelectedImage] = useState();
  
    // This function will be triggered when the file field changes
    const imageChange = (e:any) => {
      if (e.target.files && e.target.files.length > 0) {
        setSelectedImage(e.target.files[0]);
      }
    };

    return (
      <div className="Preview">
        <div >
          <input accept="image/*" type="file" onChange={imageChange}/>

          {/* {selectedImage &&  (<div ><p>{URL.createObjectURL(selectedImage)}</p></div>)}    // This (URL.createObjectURL) sets it as a url- string, rather than a File... */}
          {selectedImage &&  <div ><img src={URL.createObjectURL(selectedImage)} alt="PreviewImage"/></div>}
        </div>
      </div>
    );
  };
export default Preview;
