import "./App.css";
import SideBar from "./components/SideBar";
import Grid from "@material-ui/core/Grid";
import Canvas from "./components/Canvas";

function App() {
  return (
    <Grid container spacing={3}>
      <Grid item xs={5} sm={5} md={2} lg={2}>
        <SideBar />
      </Grid>
      <Grid item xs={7} sm={7} md={10} lg={10}>
        <Canvas />
      </Grid>
    </Grid>
  );
}

export default App;
