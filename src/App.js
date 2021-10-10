import "./App.css";
import React from "react";
import SideBar from "./components/SideBar";
import Grid from "@material-ui/core/Grid";
import Canvas from "./components/Canvas";
import { useState, useEffect } from "react";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";

// https://flowchart-backend.herokuapp.com
// http://127.0.0.1:8000
const apiUrl = "https://flowchart-backend.herokuapp.com";

function App() {
  const [currentFile, setCurrentFile] = useState(
    localStorage.getItem("current") === null
      ? {}
      : JSON.parse(localStorage.getItem("current"))
  );
  const [isCanvasVisible, setIsCanvasVisible] = useState(false);
  const [selectedColor, setSelectedColor] = useState({
    r: "193",
    g: "230",
    b: "255",
    a: "100",
  });
  const [edgeType, setEdgeType] = useState("smoothstep");
  const [isEditMode, setEditMode] = useState(false);
  const [orientation, setOrientation] = useState("vertical");

  const updateSessionDb = (session) => {
    fetch(`${apiUrl}/api/update-session`, {
      method: "POST",
      body: JSON.stringify({ session_id: session }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => console.log(json));
  };

  useEffect(() => {
    if (localStorage.getItem("session") === null) {
      const session = jwt.sign({ userId: uuidv4() }, "secretkey", {
        expiresIn: "1h",
        algorithm: "HS256",
      });
      updateSessionDb(session);
      localStorage.setItem("session", session);
    }
  }, []);
  return (
    <Grid container spacing={1}>
      <Grid item xs={5} sm={4} md={2} lg={2}>
        <SideBar
          currentFile={currentFile}
          setCurrentFile={setCurrentFile}
          setCanvasVisibility={(flag) => setIsCanvasVisible(flag)}
          setEdgeType={setEdgeType}
          setSelectedColor={setSelectedColor}
          isEditMode={isEditMode}
          setOrientation={setOrientation}
          orientation={orientation}
        />
      </Grid>
      {isCanvasVisible && (
        <Grid item xs={7} sm={8} md={10} lg={10}>
          <Canvas
            orientation={orientation}
            currentFile={currentFile}
            setCurrentFile={setCurrentFile}
            isEditMode={isEditMode}
            setEditMode={setEditMode}
            selectedColor={selectedColor}
            edgeType={edgeType}
          />
        </Grid>
      )}
    </Grid>
  );
}

export default App;
