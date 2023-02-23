import React, { useContext } from "react";
import noteContext from "../context/noteContext";

const About = () => {
  const noteCon = useContext(noteContext);
  return <>This is about.</>;
};

export default About;
