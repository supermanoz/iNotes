import About from "./components/about";
import Home from "./components/home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Alert from "./components/alert";
import Navbar from "./components/navbar";
import "bootstrap/dist/css/bootstrap.css";
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NoteState from "./context/NoteState";

function App() {
  const [message, setMessage] = useState("Hello");
  const [alertVisibility, setAlertVisibility] = useState("d-none");
  const handleAlert = (msg) => {
    setMessage(msg);
    setAlertVisibility("d-block");
    setTimeout(() => {
      setMessage("");
      setAlertVisibility("d-none");
    }, 3000);
  };
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <div className={`${alertVisibility}`}>
            <Alert message={message} />
          </div>
          <div className="container-fluid">
            <Routes>
              <Route exact path="/about" element={<About />} />
              <Route exact path="/" element={<Home onAlert={handleAlert} />} />
              <Route
                exact
                path="/login"
                element={<Login onAlert={handleAlert} />}
              />
              <Route
                exact
                path="/signup"
                element={<Signup onAlert={handleAlert} />}
              />
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
