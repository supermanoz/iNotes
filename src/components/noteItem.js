import React, { useContext } from "react";
import { FaRegTrashAlt, FaEdit } from "react-icons/fa";
import "../css/style.css";
import contextVal from "../context/noteContext";
const NoteItem = (props) => {
  const { deleteNote } = useContext(contextVal);
  const { _id, title, tag, description } = props.note;
  const handleDelete = () => {
    deleteNote(_id);
    props.onAlert("Note deleted!");
  };
  return (
    <div className="card my-3" style={{ width: "18rem" }}>
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <h6 className="card-subtitle mb-2 text-muted">{tag}</h6>
        <p className="card-text">{description}</p>
        <FaEdit
          className="edit mx-2"
          onClick={() => {
            props.handleUpdate(props.note);
          }}
        />
        <FaRegTrashAlt className="delete" onClick={handleDelete} />
      </div>
    </div>
  );
};

export default NoteItem;
