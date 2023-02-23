import { useState, useContext } from "react";
import contextVal from "../context/noteContext";
const AddNote = (props) => {
  const { addNote } = useContext(contextVal);
  const [note, setNote] = useState({ title: "", description: "", tag: "" });
  const handleClick = (e) => {
    e.preventDefault();
    setNote({ title: "", description: "", tag: "" });
    addNote(note);
    props.onAlert("Note Added!");
  };
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <>
      <h4 className="my-3">New Note</h4>
      <div className="my-3 row">
        <div className="mb-3 col-8">
          <input
            type="text"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="Enter title..."
            name="title"
            onChange={onChange}
            value={note.title}
          />
        </div>
        <div className="mb-3 col-4">
          <select
            className="form-select"
            aria-label="Default select example"
            name="tag"
            onChange={onChange}
            value={note.tag}
          >
            <option defaultValue>Tag</option>
            <option value="Personal">Personal</option>
            <option value="Office">Office</option>
            <option value="College">College</option>
          </select>
        </div>
      </div>
      <div className="mb-3 my-3">
        <textarea
          className="form-control"
          id="exampleFormControlTextarea1"
          rows="3"
          placeholder="Note"
          name="description"
          onChange={onChange}
          value={note.description}
        ></textarea>
      </div>
      <div className="d-grid gap-2">
        <button
          className="btn btn-block btn-md btn-outline-dark"
          disabled={note.title.length < 3 || note.description.length < 5}
          type="submit"
          onClick={handleClick}
        >
          Note Down
        </button>
      </div>
    </>
  );
};

export default AddNote;
