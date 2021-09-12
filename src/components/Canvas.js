import {
  Divider,
  Grid,
  Typography,
  Drawer,
  TextField,
  InputAdornment,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  Select,
  MenuItem,
  DialogActions,
  Button,
  Chip,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import AddIcon from "@material-ui/icons/Add";
import Edit from "@material-ui/icons/Edit";
import ReactFlow, {
  removeElements,
  addEdge,
  MiniMap,
  Controls,
  Background,
  Handle,
} from "react-flow-renderer";
import Delete from "@material-ui/icons/Delete";
import { CommonSeriesSettingsSelectionStyle } from "devextreme-react/chart";
import Add from "@material-ui/icons/Add";

const onLoad = (reactFlowInstance) => {
  console.log("flow loaded:", reactFlowInstance);
  console.log(reactFlowInstance.getElements());
  reactFlowInstance.fitView();
};

const CustomNodeComponent = ({ data }) => {
  return (
    <div>
      <div
        style={{
          background: "#ADD8E6",
          color: "black",
          padding: 10,
          border: "1px solid black",
          width: 150,
          height: 10,
          borderRadius: "10px 10px 0px 0px",
          textAlign: "center",
        }}
      >
        <Handle
          type="target"
          position="top"
          onConnect={(params) => console.log("handle onConnect", params)}
          style={{ background: "black" }}
        />
        <div>
          {data.title.length >= 21
            ? data.title.slice(0, 20) + "..."
            : data.title}
        </div>
      </div>
      <div
        style={{
          background: "white",
          border: "1px solid black",
          color: "black",
          padding: 10,
          width: 150,
          height: 40,
          borderRadius: "0px 0px 10px 10px",
          textAlign: "center",
        }}
      >
        <div>
          <Typography variant="caption">
            {data.description.length >= 23
              ? data.description.slice(0, 22) + "..."
              : data.description}
          </Typography>
        </div>
      </div>
      <Handle
        type="source"
        position="bottom"
        onConnect={(params) => console.log("handle onConnect", params)}
        style={{ background: "black" }}
        isConnectable={true}
      />
    </div>
  );
};

const Canvas = () => {
  // var elementsToSet;
  // if (
  //   localStorage.getItem("current") === null ||
  //   localStorage.getItem("files") === null
  // ) {
  //   elementsToSet = {};
  // } else if (
  //   Object.keys(JSON.parse(localStorage.getItem("current"))).length === 0
  // ) {
  //   elementsToSet = {};
  // } else if (
  //   JSON.parse(localStorage.getItem("current")).hasOwnProperty("expanded")
  // ) {
  //   elementsToSet = {};
  // } else {
  //   const files = JSON.parse(localStorage.getItem("files"));
  //   const index = files.indexOf(JSON.parse(localStorage.getItem("current")));
  //   console.log(index);
  //   files.at(index)["elements"] = [];
  //   localStorage.setItem("files", JSON.stringify(files));
  //   elementsToSet = files[index].elements;
  // }
  const [elements, setElements] = useState(
    localStorage.getItem("current") !== null
      ? JSON.parse(localStorage.getItem("current")).elements
      : []
  );
  console.log(elements);
  const [elementCLicked, setElementClicked] = useState({});
  const [editModeTtitle, setEditModeTitle] = useState(false);
  const [editModeDescription, setEditModeDescription] = useState(false);
  const [open, setOpen] = useState(false);
  const [tag, setTag] = useState("");
  const [current, _setCurrent] = useState(
    JSON.parse(localStorage.getItem("current"))
  );

  const onElementsRemove = (elementsToRemove) => {
    const newCurrent = { ...current };
    const index = newCurrent.elements.indexOf(elementsToRemove[0]);
    newCurrent.elements.splice(index, 1);
    localStorage.setItem("current", JSON.stringify(newCurrent));
    setElements((els) => removeElements(elementsToRemove, els));
    setElementClicked({});
  };

  const onConnect = (params) => setElements((els) => addEdge(params, els));

  const onElementClick = (event, element) => {
    setElementClicked(element);
    console.log(element);
  };

  const onNodeDragStop = (event, node) => {
    const newElements = [...elements];
    newElements.map((element) => {
      if (element.id === node.id) {
        element.position = node.position;
      }
    });
    setElements(newElements);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangeTag = (event) => {
    setTag(event.target.value);
  };

  const submitTag = () => {
    const newElements = [...elements];
    newElements.map((element) => {
      if (element.id === elementCLicked.id) {
        if (!elementCLicked.data.tags.includes(tag)) {
          const newElement = [...elementCLicked.data.tags];
          newElement.push(tag);
          elementCLicked.data.tags = newElement;
        }
      }
    });
    setOpen(false);
  };

  const handleChangeTitle = (event) => {
    const newElements = [...elements];
    newElements.map((element) => {
      if (element.id === event.target.name) {
        element.data["title"] = event.target.value;
      }
    });
    setElements(newElements);
  };

  const handleClickTitle = () => {
    setEditModeTitle(true);
  };

  const handleChangeDescription = (event) => {
    const newElements = [...elements];
    newElements.map((element) => {
      if (element.id === event.target.name) {
        element.data["description"] = event.target.value;
      }
    });
    setElements(newElements);
  };

  const handleClickDescription = () => {
    setEditModeDescription(true);
  };

  const getNodeId = () => `randomnode_${+new Date()}`;

  useEffect(() => {
    window.addEventListener("storage", () => {
      console.log(JSON.parse(localStorage.getItem("current")));
      _setCurrent(JSON.parse(localStorage.getItem("current")) || []);
    });
  }, []);

  console.log(current);

  const addNode = () => {
    const newElements = [...elements];
    newElements.push({
      id: getNodeId(),
      type: "special",
      data: {
        title: "title",
        description: "Test",
        tags: [],
      },
      position: { x: 50, y: 0 },
    });
    const newCurrent = { ...current };
    newCurrent.elements = newElements;
    localStorage.setItem("current", JSON.stringify(newCurrent));
    setElements(newElements);
  };
  console.log(localStorage.getItem("current"));
  if (current === null) {
    return <div></div>;
  } else {
    return (
      <>
        <Grid container spacing={3}>
          <Grid item xs={4} style={{ textAlign: "start" }}>
            <Button
              variant="outlined"
              color="primary"
              startIcon={<Add />}
              style={{ textAlign: "start", marginTop: 20 }}
              onClick={addNode}
            >
              New Node
            </Button>
          </Grid>
          <Grid item xs={8} style={{ textAlign: "start" }}>
            <Typography
              variant="h6"
              gutterBottom
              style={{ paddingTop: 10, fontWeight: "bold" }}
            >
              {`Project: ${current.parentId}`}
            </Typography>
            <Typography variant="h6" gutterBottom>
              {`Sub Process: ${current.text}`}
            </Typography>
          </Grid>
        </Grid>
        <Divider orientation="horizontal" />
        <ReactFlow
          nodeTypes={{ special: CustomNodeComponent }}
          elements={elements}
          onElementsRemove={onElementsRemove}
          onNodeDoubleClick={onElementClick}
          onNodeDragStop={onNodeDragStop}
          connectionLineType="smoothstep"
          onConnect={onConnect}
          onLoad={onLoad}
          snapToGrid={true}
          snapGrid={[15, 15]}
          style={{ height: "90vh", width: "84%" }}
        >
          <MiniMap
            nodeStrokeColor={(n) => {
              if (n.style?.background) return n.style.background;
              if (n.type === "special") return "#0041d0";
              if (n.type === "output") return "#ff0072";
              if (n.type === "default") return "#1a192b";

              return "#eee";
            }}
            nodeColor={(n) => {
              if (n.style?.background) return n.style.background;

              return "#fff";
            }}
            nodeBorderRadius={2}
          />
          <Controls />
          <Background color="#aaa" gap={16} />
        </ReactFlow>
        {/* <div /> */}
        <Drawer
          variant="permanent"
          anchor="right"
          style={{ textAlign: "center" }}
        >
          <Grid
            item
            xs={12}
            style={{ textAlign: "center", width: 250, overflow: "hidden" }}
          >
            {console.log(elementCLicked)}
            {Object.keys(elementCLicked).length === 0 ? (
              <Typography
                variant="h6"
                gutterBottom
                style={{ paddingTop: 380, paddingLeft: 10, paddingRight: 10 }}
              >
                Double-click on any item to get a detailed view.
              </Typography>
            ) : (
              <div>
                <Typography variant="h6" style={{ marginTop: 40 }}>
                  Edit Title
                </Typography>
                <TextField
                  name={elementCLicked.id}
                  defaultValue={elementCLicked.data.title}
                  margin="normal"
                  onChange={handleChangeTitle}
                  disabled={!editModeTtitle}
                  style={{ width: "90%" }}
                  className={{
                    marginLeft: 40,
                    marginRight: 40,
                    width: 300,
                    color: "black",
                    fontSize: 30,
                    opacity: 1,
                    borderBottom: 0,
                    "&:before": {
                      borderBottom: 0,
                    },
                  }}
                  InputProps={{
                    classes: {
                      disabled: {
                        color: "black",
                        borderBottom: 0,
                        "&:before": {
                          borderBottom: 0,
                        },
                      },
                    },
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handleClickTitle}>
                          <Edit />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <Typography variant="h6" style={{ marginTop: 20 }}>
                  Edit Description
                </Typography>
                <TextField
                  name={elementCLicked.id}
                  defaultValue={elementCLicked.data.description}
                  margin="normal"
                  onChange={handleChangeDescription}
                  disabled={!editModeDescription}
                  style={{ width: "90%" }}
                  className={{
                    marginLeft: 40,
                    marginRight: 40,
                    width: 300,
                    color: "black",
                    fontSize: 30,
                    opacity: 1,
                    borderBottom: 0,
                    "&:before": {
                      borderBottom: 0,
                    },
                  }}
                  InputProps={{
                    classes: {
                      disabled: {
                        color: "black",
                        borderBottom: 0,
                        "&:before": {
                          borderBottom: 0,
                        },
                      },
                    },
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handleClickDescription}>
                          <Edit />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <div
                  style={{
                    width: "93%",
                    minHeight: "40px",
                    textAlign: "center",
                    overflowWrap: "break-word",
                    marginLeft: 10,
                    marginRight: 300,
                  }}
                >
                  <Typography
                    variant="h5"
                    gutterBottom
                    style={{
                      margin: "auto",
                    }}
                  >
                    {elementCLicked.data.title}
                  </Typography>
                </div>
                <div
                  style={{
                    width: "93%",
                    minHeight: "40px",
                    textAlign: "center",
                    overflowWrap: "break-word",
                    paddingTop: 20,
                    marginLeft: 10,
                    marginRight: 300,
                  }}
                >
                  <Typography variant="h6" gutterBottom>
                    {elementCLicked.data.description}
                  </Typography>
                </div>
                <Divider style={{ marginTop: 10 }} />
                <Button
                  variant="outlined"
                  color="primary"
                  startIcon={<AddIcon size="medium" />}
                  onClick={() => setOpen(true)}
                  style={{ marginTop: 20 }}
                >
                  Add Tag
                </Button>
                <Dialog
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="form-dialog-title"
                >
                  <DialogTitle id="form-dialog-title">Add Tag</DialogTitle>
                  <DialogContent>
                    <Select
                      labelId="demo-simple-select-placeholder-label-label"
                      id="demo-simple-select-placeholder-label"
                      value={tag}
                      onChange={handleChangeTag}
                      fullWidth
                      displayEmpty
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {console.log(localStorage.getItem("tags"))}
                      {localStorage.getItem("tags") !== null &&
                      JSON.parse(localStorage.getItem("tags")).length > 0 ? (
                        JSON.parse(localStorage.getItem("tags")).map((tag) => {
                          return <MenuItem value={tag}>{tag}</MenuItem>;
                        })
                      ) : (
                        <div></div>
                      )}
                    </Select>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose} color="primary">
                      Cancel
                    </Button>
                    <Button onClick={submitTag} color="primary">
                      Add
                    </Button>
                  </DialogActions>
                </Dialog>
                <Divider style={{ marginTop: 20, marginBottom: 10 }} />
                {elementCLicked.data.tags.length > 0 &&
                  elementCLicked.data.tags.map((tag) => (
                    <Chip label={tag} color="secondary" />
                  ))}
                <IconButton
                  style={{ color: "red" }}
                  onClick={() => {
                    setElements((els) => removeElements([elementCLicked], els));
                    setElementClicked({});
                  }}
                >
                  <Delete />
                </IconButton>
              </div>
            )}
          </Grid>
        </Drawer>
      </>
    );
  }
};

export default Canvas;
