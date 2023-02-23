import React, { useState } from "react";
import Notes from "./notes";
import AddNote from "./addNote";
const Home = (props) => {
  return (
    <>
      <div className="container">
        <AddNote onAlert={props.onAlert} />
        <Notes onAlert={props.onAlert} />
      </div>
    </>
  );
};

export default Home;
