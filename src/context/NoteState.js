import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:3000/";
  const noteInitial = [];
  const [notes, setNotes] = useState(noteInitial);

  const fetchNotes = async () => {
    const url = `${host}api/notes/fetchallnotes`;
    const response = await fetch(url, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "Auth-Token": localStorage.getItem("token"),
      },
    });
    const jsonNotes = await response.json();
    setNotes(jsonNotes);
  };

  //add a note
  const addNote = async ({ title, description, tag }) => {
    //API call
    const url = `${host}api/notes/createnote`;
    const response = await fetch(url, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "Auth-Token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const jsonNotes = await response.json();
    //client side logic
    setNotes(
      notes.concat({
        _id: jsonNotes._id,
        title: jsonNotes.title,
        description: jsonNotes.description,
        tag: jsonNotes.tag,
        user: jsonNotes.user,
        date: jsonNotes.date,
      })
    );
    console.log(notes);
  };

  //delete a note
  const deleteNote = async (id) => {
    //API call
    const url = `${host}api/notes/deletenote/${id}`;
    const response = await fetch(url, {
      method: "DELETE",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "Auth-Token": localStorage.getItem("token"),
      },
    });

    //logic on the client side
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  //edit a note
  const editNote = async (id, title, description, tag) => {
    // API call
    const url = `${host}api/notes/editnote/${id}`;
    const response = await fetch(url, {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "Auth-Token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const jsonRes = await response.json();
    let newNotes = JSON.parse(JSON.stringify(notes));

    //logic on the client side
    for (let index = 0; index < newNotes.length; index++) {
      if (newNotes[index]._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
      setNotes(newNotes);
    }
  };
  return (
    <NoteContext.Provider
      value={{ notes, setNotes, addNote, deleteNote, editNote, fetchNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
