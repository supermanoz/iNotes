import { useNavigate } from "react-router-dom";
import { useEffect, useContext, useState, useRef } from "react";
import contextVal from "../context/noteContext";
import NoteItem from "./noteItem";
const Notes = (props) => {
  const context = useContext(contextVal);
  const navigate = useNavigate();
  const { notes, fetchNotes, editNote } = context;
  useEffect(() => {
    if (localStorage.getItem("token")) {
      fetchNotes();
    } else {
      props.onAlert("Login First!");
      navigate("/login");
    }
    // eslint-disable-next-line
  }, []);

  const [note, setNote] = useState({
    id: "",
    title: "",
    description: "",
    tag: "",
  });

  const ref = useRef(null);
  const refClose = useRef(null);

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const handleUpdate = (currentNote) => {
    setNote({
      id: currentNote._id,
      title: currentNote.title,
      description: currentNote.description,
      tag: currentNote.tag,
    });
    ref.current.click();
  };

  const handleClick = () => {
    editNote(note.id, note.title, note.description, note.tag);
    refClose.current.click();
    props.onAlert("Note Updated!");
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-primary d-none"
        data-toggle="modal"
        data-target="#exampleModal"
        ref={ref}
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Note
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              {" "}
              <div className="my-3 row">
                <div className="mb-3 col-8">
                  <input
                    type="text"
                    className="form-control"
                    id="exampleFormControlInput1"
                    placeholder="Enter title..."
                    name="title"
                    value={note.title}
                    onChange={onChange}
                  />
                </div>
                <div className="mb-3 col-4">
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    name="tag"
                    value={note.tag}
                    onChange={onChange}
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
                  value={note.description}
                  onChange={onChange}
                ></textarea>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                ref={refClose}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                disabled={note.title.length < 3 || note.description.length < 5}
                onClick={() => {
                  handleClick();
                }}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
      <h4 className="my-4">My Notes</h4>
      <div className="container">
        <div className="row">
          {notes.length > 0 ? (
            notes.map((notee) => (
              <div className="col-3" key={notee._id}>
                <NoteItem
                  note={notee}
                  handleUpdate={handleUpdate}
                  onAlert={props.onAlert}
                />
              </div>
            ))
          ) : (
            <em>No notes found</em>
          )}
        </div>
      </div>
    </>
  );
};

export default Notes;
