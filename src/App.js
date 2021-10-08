import "./App.css";
import SideBar from "./components/SideBar";
import Grid from "@material-ui/core/Grid";
import Canvas from "./components/Canvas";
import { Tabs, Tab } from "@material-ui/core";
import StorageIcon from "@material-ui/icons/Storage";
import PermDataSettingIcon from "@material-ui/icons/PermDataSetting";
import { useState, useEffect } from "react";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";

// https://flowchart-backend.herokuapp.com
// http://127.0.0.1:8000
const apiUrl = "http://127.0.0.1:8000";

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
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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

  const a11yProps = (index) => {
    return {
      id: `scrollable-force-tab-${index}`,
      "aria-controls": `scrollable-force-tabpanel-${index}`,
    };
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
        />
      </Grid>
      {isCanvasVisible && (
        <Grid item xs={7} sm={8} md={10} lg={10}>
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
