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
  Switch,
  Badge,
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
import Add from "@material-ui/icons/Add";
import reactCSS from "reactcss";
import { SketchPicker } from "react-color";
import VisibilityIcon from "@material-ui/icons/Visibility";
import EditIcon from "@material-ui/icons/Edit";

const onLoad = (reactFlowInstance) => {
  // console.log("flow loaded:", reactFlowInstance);
  // console.log(reactFlowInstance.getElements());
  reactFlowInstance.fitView();
};

const SpecialNodeComponent = ({ data }) => {
  return (
    <div>
      <div
        style={{
          background: `rgba(${data.color.r}, ${data.color.g}, ${data.color.b}, ${data.color.a})`,
          color: "black",
          padding: 10,
          border: "1px solid black",
          width: 150,
          minHeight: 10,
          borderRadius: "10px 10px 0px 0px",
          textAlign: "center",
        }}
      >
        <Handle type="target" position="top" style={{ background: "black" }} />
        {/* <div>
          {data.title.length >= 21
            ? data.title.slice(0, 20) + "..."
            : data.title}
        </div> */}
        <div
          style={{
            width: "93%",
            // textAlign: "center",
            overflowWrap: "break-word",
            marginLeft: 10,
            marginRight: 300,
          }}
        >
          <Typography
            variant="subtitle2"
            gutterBottom
            style={{
              margin: "auto",
            }}
          >
            {data.title}
          </Typography>
        </div>
      </div>
      <div
        style={{
          background: "white",
          border: "1px solid black",
          color: "black",
          padding: 10,
          width: 150,
          minHeight: 40,
          borderRadius: "0px 0px 10px 10px",
          textAlign: "center",
        }}
      >
        {/* <div>
          <Typography variant="caption">
            {data.description.length >= 23
              ? data.description.slice(0, 22) + "..."
              : data.description}
          </Typography>
        </div> */}
        <div
          style={{
            width: "93%",
            minHeight: "40px",
            // textAlign: "center",
            overflowWrap: "break-word",
            marginLeft: 10,
            marginRight: 300,
          }}
        >
          <Typography
            variant="subtitle2"
            gutterBottom
            style={{
              margin: "auto",
            }}
          >
            {data.description}
          </Typography>
        </div>
      </div>
      <Handle
        type="source"
        position="bottom"
        style={{ background: "black" }}
        isConnectable={true}
      />
    </div>
  );
};

const OvalNodeComponent = ({ data }) => {
  return (
    <div
      style={{
        background: `rgba(${data.color.r}, ${data.color.g}, ${data.color.b}, ${data.color.a})`,
        color: "black",
        padding: 10,
        border: "1px solid black",
        width: 150,
        minHeight: 70,
        textAlign: "center",
        borderRadius: "50px",
      }}
    >
      <Handle type="target" position="top" style={{ background: "black" }} />
      {/* <div style={{ paddingTop: 20 }}>
        {data.title.length >= 21 ? data.title.slice(0, 20) + "..." : data.title}
      </div> */}
      <div
        style={{
          width: "93%",
          // textAlign: "center",
          overflowWrap: "break-word",
          marginLeft: 10,
          marginRight: 300,
        }}
      >
        <Typography
          variant="subtitle2"
          gutterBottom
          style={{
            margin: "auto",
          }}
        >
          {data.title.substring(0, 27)}
        </Typography>
      </div>
      <Handle
        type="source"
        position="bottom"
        style={{ background: "black" }}
        isConnectable={true}
      />
    </div>
  );
};

const RectangleNodeComponent = ({ data }) => {
  return (
    <div
      style={{
        background: `rgba(${data.color.r}, ${data.color.g}, ${data.color.b}, ${data.color.a})`,
        color: "black",
        padding: 10,
        border: "1px solid black",
        width: 150,
        minHeight: 70,
        textAlign: "center",
        borderRadius: "10px",
      }}
    >
      <Handle type="target" position="top" style={{ background: "black" }} />
      {/* <div style={{ paddingTop: 20 }}>
        {data.title.length >= 21 ? data.title.slice(0, 20) + "..." : data.title}
      </div> */}
      <div
        style={{
          width: "93%",
          // textAlign: "center",
          overflowWrap: "break-word",
          marginLeft: 10,
          marginRight: 300,
        }}
      >
        <Typography
          variant="subtitle2"
          gutterBottom
          style={{
            margin: "auto",
          }}
        >
          {data.title}
        </Typography>
      </div>
      <Handle
        type="source"
        position="bottom"
        style={{ background: "black" }}
        isConnectable={true}
      />
    </div>
  );
};

const DiamondNodeComponent = ({ data }) => {
  return (
    <div>
      <div
        style={{
          background: `rgba(${data.color.r}, ${data.color.g}, ${data.color.b}, ${data.color.a})`,
          color: "black",
          padding: 10,
          border: "1px solid black",
          width: 100,
          minHeight: 100,
          textAlign: "center",
          borderRadius: "5px",
          transform: "rotate(45deg)",
        }}
      >
        <div style={{ transform: "rotate(-45deg)", marginTop: 35 }}>
          {/* <div>
            {data.title.length >= 16
              ? data.title.slice(0, 15) + "..."
              : data.title}
          </div> */}
          <div
            style={{
              width: "93%",
              minHeight: "40px",
              // textAlign: "center",
              overflowWrap: "break-word",
              marginLeft: 10,
              marginRight: 300,
            }}
          >
            <Typography
              variant="subtitle2"
              gutterBottom
              style={{
                margin: "auto",
              }}
            >
              {data.title}
            </Typography>
          </div>
        </div>
      </div>
      <Handle
        type="source"
        position="bottom"
        style={{ background: "black" }}
        isConnectable={true}
      />
      <Handle type="target" position="top" style={{ background: "black" }} />
    </div>
  );
};

const Canvas = ({ currentFile, selectedColor, edgeType }) => {
  const [elements, setElements] = useState([]);
  const [elementCLicked, setElementClicked] = useState({});
  const [editModeTtitle, setEditModeTitle] = useState(false);
  const [editModeDescription, setEditModeDescription] = useState(false);
  const [isEditMode, setEditMode] = useState(false);
  const [open, setOpen] = useState(false);
  const [openNewNode, setOpenNewNode] = useState(false);
  const [tag, setTag] = useState("");
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const [color, setColor] = useState({
    r: "193",
    g: "230",
    b: "255",
    a: "100",
  });

  const updateElementsDb = (newElements) => {
    console.log("updating database....");
    console.log(newElements);
    fetch("http://127.0.0.1:8000/api/update-elements", {
      method: "POST",
      body: JSON.stringify({
        session_id: localStorage.getItem("session"),
        elements: newElements,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json.elements);
        setElements(json.elements);
      });
  };

  const onElementsRemove = () => {
    const update = elements.filter((data) => {
      return data.id !== elementCLicked.id;
    });
    const newCurrent = { ...currentFile };
    newCurrent.elements = update;
    setElements(update);
    updateNode();
  };

  const onConnect = async (params) => {
    //  setElements((els) => addEdge(params, els))
    //  console.log(elements);
    //  updateNode()
    const newParams = { ...params };
    newParams.type = edgeType;
    // console.log(newParams, "**********8");
    const edge = await addEdge(newParams, elements);
    await setElements(edge);
    await updateNode(edge);
  };

  const onElementClick = async (event, element) => {
    setElementClicked(element);
  };

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/get-user-info", {
      method: "POST",
      body: JSON.stringify({
        session_id: localStorage.getItem("session"),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json.elements, "the bugggggggggggg");
        setElements(json.elements);
      });
  }, [currentFile]);

  const onNodeDragStop = (event, node) => {
    const newElements = [...elements];
    console.log(newElements);
    newElements.map((element) => {
      if (element.id === node.id) {
        element.position = node.position;
      }
    });
    setElements(newElements);
    updateNode();
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangeTag = (event) => {
    setTag(event.target.value);
  };

  const submitTag = async () => {
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
    await setElements(newElements);
    updateNode();
    // localStorage.setItem("elements", JSON.stringify(newElements));
    setOpen(false);
  };

  const handleChangeTitle = (event) => {
    const newElements = [...elements];
    newElements.map((element) => {
      if (element.id === event.target.name) {
        let str;
        if (event.target.value.length >= 27) {
          str = event.target.value.substring(0, 27);
        } else {
          str = event.target.value;
        }
        element.data["title"] = str;
      }
    });
    setElements(newElements);
    updateNode();
    // const newElements = [...elements];
    // newElements.map((element) => {
    //   if (element.id === event.target.name) {
    //     element.data["title"] = event.target.value;
    //   }
    // });
    // setElements(newElements);
    // updateNode();
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
    updateNode();
    // const newElements = [...elements];
    // newElements.map((element) => {
    //   if (element.id === event.target.name) {
    //     element.data["description"] = event.target.value;
    //   }
    // });
    // setElements(newElements);
    // // localStorage.setItem("elements", JSON.stringify(newElements));
    // updateNode();
  };

  const handleDelete = async () => {
    const update = elements.filter((data) => {
      return data.id !== elementCLicked.id;
    });
    if (currentFile !== null) {
      const newCurrent = { ...currentFile };
      newCurrent.elements = update;
    }
    setElements(update);
    setElementClicked({});
  };

  const handleClickDescription = () => {
    setEditModeDescription(true);
  };

  const getNodeId = () => `randomnode_${+new Date()}`;

  const updateNode = (element = elements) => {
    const newElements = [...element];
    const newCurrent = { ...currentFile };
    newCurrent.elements = newElements;
    setElements(newElements);
  };
  const addNode = (type) => {
    let newElements = elements ? [...elements] : [];
    newElements.push({
      id: getNodeId(),
      node: currentFile.id,
      type: type,
      data: {
        title: "title",
        description: type === "special" ? "A description" : null,
        color: selectedColor,
        tags: [],
      },
      position: { x: 100, y: 0 },
    });
    const newCurrent = { ...currentFile };
    newCurrent.elements = newElements;
    setElements(newElements);
  };

  const handleClickColor = () => {
    setDisplayColorPicker(!displayColorPicker);
  };

  const handleCloseColor = () => {
    setDisplayColorPicker(false);
  };

  const handleChangeColor = (color) => {
    setColor(color.rgb);
    const newElements = [...elements];
    newElements.map((element) => {
      if (element.id === elementCLicked.id) {
        element.data.color = color.rgb;
      }
    });
    setElements(newElements);
    updateNode();
  };

  const styles = reactCSS({
    default: {
      color: {
        width: "36px",
        height: "14px",
        borderRadius: "2px",
        background: `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`,
      },
      swatch: {
        padding: "5px",
        borderRadius: "1px",
        boxShadow: "0 0 0 1px rgba(0,0,0,.1)",
        display: "inline-block",
        cursor: "pointer",
      },
      popover: {
        position: "absolute",
        zIndex: "2",
      },
      cover: {
        position: "fixed",
        top: "0px",
        right: "0px",
        bottom: "0px",
        left: "0px",
      },
    },
  });

  const handleChangeSwitch = () => {
    setEditMode(!isEditMode);
  };

  console.log(elements);

  let filteredElements;

  if (elements.length === 0) {
    filteredElements = [];
  } else {
    console.log(elements, "***********************88");
    filteredElements = elements.filter((data) => {
      return data.node === currentFile.id || data.source;
    });
  }

  if (currentFile === null) {
    return <div></div>;
  } else {
    return (
      <>
        <Grid container spacing={3}>
          <Grid item xs={4} style={{ textAlign: "start" }}>
            {isEditMode && (
              <>
                <Button
                  variant="outlined"
                  color="primary"
                  startIcon={<Add />}
                  style={{
                    textAlign: "start",
                    marginTop: 20,
                  }}
                  onClick={() => setOpenNewNode(true)}
                >
                  New Node
                </Button>
                <Dialog
                  open={openNewNode}
                  onClose={handleClose}
                  aria-labelledby="form-dialog-title"
                  style={{ overflow: "hidden" }}
                >
                  <DialogTitle
                    id="form-dialog-title"
                    style={{ textAlign: "center" }}
                  >
                    Select a Shape
                  </DialogTitle>
                  <DialogContent>
                    <Grid container direction="column" spacing={1}>
                      <Grid container direction="row" spacing={1}>
                        <Grid item xs={6}>
                          <div
                            onClick={() => {
                              addNode("special");
                              setOpenNewNode(false);
                            }}
                          >
                            <div
                              style={{
                                background: "#ADD8E6",
                                color: "black",
                                padding: 10,
                                border: "1px solid black",
                                width: 100,
                                height: 10,
                                borderRadius: "10px 10px 0px 0px",
                                textAlign: "center",
                                cursor: "pointer",
                              }}
                            ></div>
                            <div
                              style={{
                                background: "white",
                                border: "1px solid black",
                                color: "black",
                                padding: 10,
                                width: 100,
                                height: 40,
                                borderRadius: "0px 0px 10px 10px",
                                textAlign: "center",
                                marginRight: "20px",
                                cursor: "pointer",
                              }}
                            ></div>
                          </div>
                        </Grid>
                        <Grid item xs={6}>
                          <div
                            style={{
                              border: "1px solid black",
                              height: "90px",
                              width: "130px",
                              borderRadius: "50px",
                              marginLeft: "10px",
                              cursor: "pointer",
                            }}
                            onClick={() => {
                              addNode("oval");
                              setOpenNewNode(false);
                            }}
                          ></div>
                        </Grid>
                      </Grid>
                      <Grid
                        container
                        direction="row"
                        spacing={1}
                        style={{ paddingTop: "30px", paddingBottom: "20px" }}
                      >
                        <Grid item xs={6}>
                          <div
                            style={{
                              border: "1px solid black",
                              height: "80px",
                              width: "130px",
                              borderRadius: "10px",
                              cursor: "pointer",
                            }}
                            onClick={() => {
                              addNode("rectangle");
                              setOpenNewNode(false);
                            }}
                          ></div>
                        </Grid>
                        <Grid item xs={6}>
                          <div
                            style={{
                              border: "1px solid black",
                              height: "80px",
                              width: "80px",
                              borderRadius: "5px",
                              transform: "rotate(45deg)",
                              marginLeft: "30px",
                              cursor: "pointer",
                            }}
                            onClick={() => {
                              addNode("diamond");
                              setOpenNewNode(false);
                            }}
                          ></div>
                        </Grid>
                      </Grid>
                    </Grid>
                  </DialogContent>
                </Dialog>
              </>
            )}
          </Grid>
          <Grid item xs={2} style={{ textAlign: "center" }}>
            <Typography
              variant="h6"
              gutterBottom
              style={{ paddingTop: 10, fontWeight: "bold" }}
            >
              {`Project: ${currentFile.parentId}`}
            </Typography>
            <Typography variant="h6" gutterBottom>
              {`Sub Process: ${currentFile.text}`}
            </Typography>
          </Grid>
          <Grid item xs={6} style={{ textAlign: "center" }}>
            <Typography component="div">
              <Grid
                component="label"
                container
                alignItems="center"
                spacing={1}
                style={{ paddingTop: 20, paddingLeft: 90 }}
              >
                <Grid item>View</Grid>
                <Grid item>
                  <Switch
                    color="primary"
                    checked={isEditMode}
                    onChange={handleChangeSwitch}
                    name="checked"
                  />
                </Grid>
                <Grid item>Edit</Grid>
                {isEditMode && (
                  <Button
                    variant="contained"
                    color="primary"
                    style={{ marginLeft: 60 }}
                    onClick={() => {
                      console.log(
                        elements,
                        "t8934ufjhn888ewhyobfo8ulh74uilw748ofulufo47fuligo7t357grlgt57grsg7rsty7osrlgwyot7rswy7hsgywo7hrlgwy7oglyo4rhgyotrglyo4rgyot7r"
                      );
                      updateElementsDb([...elements]);
                    }}
                  >
                    Save
                  </Button>
                )}
              </Grid>
            </Typography>
          </Grid>
        </Grid>
        <Divider orientation="horizontal" />
        <ReactFlow
          nodeTypes={{
            special: SpecialNodeComponent,
            oval: OvalNodeComponent,
            rectangle: RectangleNodeComponent,
            diamond: DiamondNodeComponent,
          }}
          elements={filteredElements}
          onElementsRemove={onElementsRemove}
          onNodeDoubleClick={onElementClick}
          onNodeDragStop={onNodeDragStop}
          connectionLineType={edgeType}
          onPaneContextMenu={() => setOpenNewNode(true)}
          onConnect={onConnect}
          onLoad={onLoad}
          snapToGrid={false}
          // snapGrid={[15, 15]}
          paneMoveable={true}
          style={{ height: "90vh", width: isEditMode ? "84%" : "95%" }}
        >
          <MiniMap
            nodeStrokeColor={(n) => {
              if (n.style?.background) return n.style.background;
              if (n.type === "special") return "#0041d0";
              if (n.type === "oval") return "#008000";
              if (n.type === "rectangle") return "#8A2BE2";
              if (n.type === "diamond") return "#00008b";
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
        {isEditMode && (
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
                    value={elementCLicked.data.title}
                    InputProps={{
                      // classes: {
                      //   disabled: {
                      //     color: "black",
                      //     borderBottom: 0,
                      //     "&:before": {
                      //       borderBottom: 0,
                      //     },
                      //   },
                      // },
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={handleClickTitle}>
                            <Edit />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  {elementCLicked.type === "special" && (
                    <>
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
                        value={elementCLicked.data.description}
                        // className={{
                        //   marginLeft: 40,
                        //   marginRight: 40,
                        //   width: 300,
                        //   color: "black",
                        //   fontSize: 30,
                        //   opacity: 1,
                        //   borderBottom: 0,
                        //   "&:before": {
                        //     borderBottom: 0,
                        //   },
                        // }}
                        InputProps={{
                          // classes: {
                          //   disabled: {
                          //     color: "black",
                          //     borderBottom: 0,
                          //     "&:before": {
                          //       borderBottom: 0,
                          //     },
                          //   },
                          // },
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton onClick={handleClickDescription}>
                                <Edit />
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                    </>
                  )}
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
                        {localStorage.getItem("tags") !== null &&
                        JSON.parse(localStorage.getItem("tags")).length > 0 ? (
                          JSON.parse(localStorage.getItem("tags")).map(
                            (tag) => {
                              return <MenuItem value={tag}>{tag}</MenuItem>;
                            }
                          )
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
                      <Chip
                        label={tag}
                        color="secondary"
                        style={{ marginBottom: 10 }}
                      />
                    ))}

                  <Divider orientation="horizontal" style={{ marginTop: 10 }} />
                  <Grid
                    item
                    xs={12}
                    style={{
                      textAlign: "center",
                      maxHeight: "100%",
                      overflow: "auto",
                    }}
                  >
                    <div style={{ paddingLeft: 20, paddingTop: 20 }}>
                      <Grid item xs={12}>
                        <Typography variant="subtitle1" gutterBottom>
                          Node Color
                        </Typography>
                        <div style={styles.swatch} onClick={handleClickColor}>
                          <div style={styles.color} />
                        </div>
                        {displayColorPicker ? (
                          <div style={styles.popover}>
                            <div
                              style={styles.cover}
                              onClick={handleCloseColor}
                            />
                            <SketchPicker
                              color={color}
                              onChange={handleChangeColor}
                            />
                          </div>
                        ) : null}
                      </Grid>
                    </div>
                  </Grid>
                  <Divider style={{ marginTop: 20, marginBottom: 10 }} />
                  <IconButton
                    style={{ color: "red" }}
                    onClick={() => handleDelete()}
                  >
                    <Delete />
                  </IconButton>
                </div>
              )}
            </Grid>
          </Drawer>
        )}
      </>
    );
  }
};

export default Canvas;
