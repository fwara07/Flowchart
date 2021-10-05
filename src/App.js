import "./App.css";
import SideBar from "./components/SideBar";
import Grid from "@material-ui/core/Grid";
import Canvas from "./components/Canvas";
import { useState, useEffect } from "react";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

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

  const updateSessionDb = (session) => {
    fetch("https://flowchart-backend.herokuapp.com/api/update-session", {
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
    <Grid container spacing={3}>
      <Grid item xs={5} sm={5} md={2} lg={2}>
        <SideBar
          currentFile={currentFile}
          setCurrentFile={setCurrentFile}
          setCanvasVisibility={(flag) => setIsCanvasVisible(flag)}
          setEdgeType={setEdgeType}
          setSelectedColor={setSelectedColor}
        />
      </Grid>
      {isCanvasVisible && (
        <Grid item xs={7} sm={7} md={10} lg={10}>
          <Canvas
            currentFile={currentFile}
            setCurrentFile={setCurrentFile}
            selectedColor={selectedColor}
            edgeType={edgeType}
          />
        </Grid>
      )}
    </Grid>
  );
}

export default App;
