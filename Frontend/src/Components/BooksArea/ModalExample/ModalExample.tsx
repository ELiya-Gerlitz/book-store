import "./ModalExample.css";
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { NavLink, useNavigate } from "react-router-dom";
import BookService from "../../../service/BookService";

interface ModalInterface{
    id: number
}

function ModalExample(props: ModalInterface): JSX.Element {
    const navigate= useNavigate()
    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  async function deleteBookfunction(id:number){
    try{
        await BookService.deleteBook(id)
        handleClose()
        console.log(`book ${id} successfully deleted!`)
        navigate("/books")
    }catch(err:any){
        alert(err)
    }
}

    return (
        <div className="ModalExample">
    <NavLink to="#" onClick={handleShow}>
        delete book
      </NavLink>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete the book?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={()=>deleteBookfunction(props.id)}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
        </div>
    );
}

export default ModalExample;
