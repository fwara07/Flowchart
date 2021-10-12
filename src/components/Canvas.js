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
  Snackbar,
  DialogActions,
  Button,
  FormControl,
  InputLabel,
  Chip,
  Fab,
} from "@material-ui/core";
import React, { useState, useEffect, useRef } from "react";
import AddIcon from "@material-ui/icons/Add";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { DropzoneDialogBase } from "material-ui-dropzone";
import CloseIcon from "@material-ui/icons/Close";
import Papa from "papaparse";
import Edit from "@material-ui/icons/Edit";
import ReactFlow, {
  removeElements,
  ReactFlowProvider,
  getIncomers,
  getOutgoers,
  isNode,
  addEdge,
  MiniMap,
  Controls,
  Background,
  Handle,
  getConnectedEdges,
  isEdge,
} from "react-flow-renderer";
import Delete from "@material-ui/icons/Delete";
import Add from "@material-ui/icons/Add";
import reactCSS from "reactcss";
import { SketchPicker } from "react-color";
import VisibilityIcon from "@material-ui/icons/Visibility";
import EditIcon from "@material-ui/icons/Edit";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { Alert, AlertTitle } from "@material-ui/lab";
import dagre from "dagre";
import { EditText } from "react-edit-text";
import "react-edit-text/dist/index.css";

let id = 0;
const getId = () => `dndnode_${id++}`;

let realOrientation;

const dagreGraph = new dagre.graphlib.Graph();
// https://flowchart-backend.herokuapp.com
// http://127.0.0.1:8000
const apiUrl = "https://flowchart-backend.herokuapp.com";
dagreGraph.setDefaultEdgeLabel(() => ({}));

// In order to keep this example simple the node width and height are hardcoded.
// In a real world app you would use the correct width and height values of
// const nodes = useStoreState(state => state.nodes) and then node.__rf.width, node.__rf.height

// const nodeDimensions = {
//   special: { width: 50, height: 150 },
//   rectangle: { width: 150, height: 70 },
//   oval: { width: 150, height: 70 },
//   diamond: { width: 100, height: 100 },
// };
const nodeWidth = 170;
const nodeHeight = 180;
const getLayoutedElements = (elements, direction = "TB") => {
  const isHorizontal = direction === "LR";
  dagreGraph.setGraph({ rankdir: direction });

  elements.forEach((el) => {
    if (isNode(el)) {
      dagreGraph.setNode(el.id, {
        width: nodeWidth,
        height: nodeHeight,
      });
    } else {
      dagreGraph.setEdge(el.source, el.target);
    }
  });

  dagre.layout(dagreGraph);

  return elements.map((el) => {
    if (isNode(el)) {
      const nodeWithPosition = dagreGraph.node(el.id);
      el.targetPosition = isHorizontal ? "left" : "top";
      el.sourcePosition = isHorizontal ? "right" : "bottom";

      // unfortunately we need this little hack to pass a slightly different position
      // to notify react flow about the change. Moreover we are shifting the dagre node position
      // (anchor=center center) to the top left so it matches the react flow node anchor point (top left).
      el.position = {
        x: nodeWithPosition.x - nodeWidth / 2 + Math.random() / 1000,
        y: nodeWithPosition.y - nodeHeight / 2,
      };
    }

    return el;
  });
};

const useStyles = makeStyles((theme) =>
  createStyles({
    previewChip: {
      minWidth: 160,
      maxWidth: 210,
    },
  })
);

const SpecialNodeComponent = ({ data }) => {
  return (
    <div>
      <div
        style={{
          background: "#f0f0f0",
          borderColor: `rgba(${data.color.r}, ${data.color.g}, ${data.color.b}, ${data.color.a})`,
          color: "black",
          padding: 10,
          border: `2px solid rgba(${data.color.r}, ${data.color.g}, ${data.color.b}, ${data.color.a})`,
          width: 150,
          minHeight: 10,
          borderRadius: "10px 10px 0px 0px",
          textAlign: "center",
        }}
      >
        <Handle
          type="target"
          position={realOrientation === "horizontal" ? "left" : "top"}
          style={{ background: "black" }}
        />
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
          width: "93%",
          width: 150,
          background: "#f0f0f0",
          border: `2px solid rgba(${data.color.r}, ${data.color.g}, ${data.color.b}, ${data.color.a})`,
          color: "black",
          padding: 10,
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
            // overflowWrap: "break-word",
            textAlign: "center",
            marginLeft: 10,
            marginRight: 300,
          }}
        >
          <Grid
            container
            direction="row"
            spacing={1}
            justifyContent="center"
            alignItems="center"
          >
            {/* <div style={{ paddingLeft: 35, paddingRight: 10 }}>key</div> */}
            <div style={{ textAlign: "center" }}>
              {data.description.map((pair) => {
                return (
                  <Typography
                    variant="subtitle2"
                    gutterBottom
                    style={{
                      paddingRight: 10,
                    }}
                  >
                    {pair.key}
                  </Typography>
                );
              })}
            </div>
            <Divider
              orientation="vertical"
              style={{ minHeight: 50, textAlign: "center" }}
              flexItem
            />
            <div style={{ textAlign: "center" }}>
              {data.description.map((pair) => {
                return (
                  <Typography
                    variant="subtitle2"
                    gutterBottom
                    style={{
                      paddingLeft: 10,
                    }}
                  >
                    {pair.value}
                  </Typography>
                );
              })}
            </div>
            {/* <div style={{ paddingLeft: 10 }}>Value</div> */}
          </Grid>
          {/* <Typography
            variant="subtitle2"
            gutterBottom
            style={{
              margin: "auto",
            }}
          >
            {data.description}
          </Typography> */}
        </div>
      </div>
      <Handle
        type="source"
        position={realOrientation === "horizontal" ? "right" : "bottom"}
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
        background: "#f0f0f0",
        borderColor: `rgba(${data.color.r}, ${data.color.g}, ${data.color.b}, ${data.color.a})`,
        color: "black",
        padding: 10,
        border: `2px solid rgba(${data.color.r}, ${data.color.g}, ${data.color.b}, ${data.color.a})`,
        width: 150,
        minHeight: 70,
        textAlign: "center",
        borderRadius: "50px",
      }}
    >
      <Handle
        type="target"
        position={realOrientation === "horizontal" ? "left" : "top"}
        style={{ background: "black" }}
      />
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
        position={realOrientation === "horizontal" ? "right" : "bottom"}
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
        background: "#f0f0f0",
        borderColor: `rgba(${data.color.r}, ${data.color.g}, ${data.color.b}, ${data.color.a})`,
        color: "black",
        padding: 10,
        border: `2px solid rgba(${data.color.r}, ${data.color.g}, ${data.color.b}, ${data.color.a})`,
        width: 150,
        minHeight: 70,
        textAlign: "center",
        borderRadius: "10px",
      }}
    >
      <Handle
        type="target"
        position={realOrientation === "horizontal" ? "left" : "top"}
        style={{ background: "black" }}
      />
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
        position={realOrientation === "horizontal" ? "right" : "bottom"}
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
          background: "#f0f0f0",
          color: "black",
          padding: 10,
          border: `2px solid rgba(${data.color.r}, ${data.color.g}, ${data.color.b}, ${data.color.a})`,
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
        position={realOrientation === "horizontal" ? "right" : "bottom"}
        style={{ background: "black" }}
        isConnectable={true}
      />
      <Handle
        type="target"
        position={realOrientation === "horizontal" ? "left" : "top"}
        style={{ background: "black" }}
      />
    </div>
  );
};

const Canvas = ({
  currentFile,
  selectedColor,
  edgeType,
  setEditMode,
  isEditMode,
  orientation,
}) => {
  realOrientation = orientation;
  const [elements, setElements] = useState([]);
  const [elementCLicked, setElementClicked] = useState({});
  const [editModeTtitle, setEditModeTitle] = useState(false);
  const [editModeDescription, setEditModeDescription] = useState(false);
  const [open, setOpen] = useState(false);
  const [openUpload, setOpenUpload] = React.useState(false);
  const [openNewNode, setOpenNewNode] = useState(false);
  const [tag, setTag] = useState("");
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const [color, setColor] = useState({
    r: "193",
    g: "230",
    b: "255",
    a: "100",
  });
  const [toggledElements, setToggledElements] = useState([]);
  const [targetElements, setTargetElements] = useState({});
  const [isFirstTime, setFirstTime] = useState(true);
  const [fileObjects, setFileObjects] = React.useState([]);
  const [renderAlert, setRenderAlert] = useState({ value: false, msg: "" });
  const [tags, setTags] = useState([]);
  const [csv, setCsv] = useState(false);
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [openNewField, setOpenNewField] = useState(false);
  const [field, setField] = useState({ key: "", value: "" });
  console.log();
  const [hasArrowEdge, setArrowEdge] = useState(
    elementCLicked.hasOwnProperty("data")
      ? elementCLicked.data.hasArrowEdge
      : false
  );
  const [hasAnimatedEdge, setAnimatedEdge] = useState(
    elementCLicked.hasOwnProperty("data")
      ? elementCLicked.data.hasAnimatedEdge
      : false
  );
  const [isCollapsable, setCollapsable] = useState(
    elementCLicked.hasOwnProperty("data")
      ? elementCLicked.data.isCollapsable
      : false
  );

  const onLoad = (reactFlowInstance) => {
    // console.log("flow loaded:", reactFlowInstance);
    // console.log(reactFlowInstance.getElements());
    setReactFlowInstance(reactFlowInstance);
    reactFlowInstance.fitView();
  };

  const handleCloseField = () => {
    setOpenNewField(false);
  };

  const handleChangeEdgeType = (event) => {
    const edges = getConnectedEdges([elementCLicked], elements);
    const newElements = [...elements];
    let elementClickedIndex;
    edges.map((edge) => {
      newElements.map((element, index) => {
        if (isEdge(element)) {
          if (element.id === edge.id) {
            console.log(element);
            element.type = event.target.value;
          }
        }
      });
    });
    setElements(newElements);
    updateNode(newElements);
  };

  const updateElementsDb = (newElements, currentFile, isDelete = false) => {
    // console.log("updating database....");
    // console.log(newElements);
    console.log(currentFile);
    fetch(`${apiUrl}/api/update-elements`, {
      method: "POST",
      body: JSON.stringify({
        session_id: localStorage.getItem("session"),
        file: currentFile.id,
        isDelete: isDelete,
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
    updateNode(update);
  };

  const onConnect = async (params) => {
    //  setElements((els) => addEdge(params, els))
    //  console.log(elements);
    //  updateNode()
    const newParams = { ...params };
    newParams.type = edgeType;
    newParams.animated = false;
    // console.log(newParams, "**********8");
    const edge = await addEdge(newParams, elements);
    await setElements(edge);
  };

  const onElementClick = async (event, element) => {
    if (isEditMode) {
      setElementClicked(element);
      setCollapsable(element.data.isCollapsable);
      setAnimatedEdge(element.data.hasAnimatedEdge);
      setArrowEdge(element.data.hasArrowEdge);
    }
  };

  const getAllOutgoers = (node, elements) => {
    return getOutgoers(node, elements).reduce(
      (memo, outgoer) => [
        ...memo,
        outgoer,
        ...getAllOutgoers(outgoer, elements),
      ],
      []
    );
  };

  const onNodeClick = async (event, element) => {
    if (isEditMode === false) {
      if (element.data.isCollapsable) {
        let newElements = [...elements];
        const children = getOutgoers(element, elements);
        if (children.length > 0) {
          const allOutgoers = getAllOutgoers(element, elements);
          console.log(allOutgoers);
          console.log(children);
          if (children[0].isHidden) {
            children.map((child) => {
              const newChild = { ...child };
              newChild.isHidden = false;
              console.log(newChild);
              newElements = newElements.map((u) => {
                if (u.id !== child.id) {
                  if (u.hasOwnProperty("target")) {
                    if (u.target === child.id) {
                      u.isHidden = false;
                    }
                  }
                  return u;
                } else {
                  return newChild;
                }
              });
              // newElements = newElements.map((u) => (u.id !== child.id ? u : newChild));
            });
          } else {
            allOutgoers.map((child) => {
              const newChild = { ...child };
              newChild.isHidden = true;
              console.log(newChild);
              newElements = newElements.map((u) => {
                if (u.id !== child.id) {
                  if (u.hasOwnProperty("target")) {
                    if (u.target === child.id) {
                      u.isHidden = true;
                    }
                  }
                  return u;
                } else {
                  return newChild;
                }
              });
              // newElements = newElements.map((u) => (u.id !== child.id ? u : newChild));
            });
          }
          console.log(newElements);
          setElements(newElements);
          // let _elements;
          // if (Object.keys(targetElements).length > 0) {
          //   _elements = JSON.parse(JSON.stringify(toggledElements));
          // } else {
          //   _elements = JSON.parse(JSON.stringify(elements));
          // }
          // if (!targetElements[element.id]) {
          //   const targets = [];
          //   _elements.forEach((elem) => {
          //     if (elem["source"] !== undefined && elem.source === element.id) {
          //       targets.push(elem.target);
          //     }
          //   });
          //   console.log("targets", targets);
          //   console.log("elements", _elements);
          //   let firstLevelChildren;
          //   firstLevelChildren = _elements.filter(
          //     (elem) => elem.source !== element.id
          //   );
          //   // console.log('first-level-children-1', firstLevelChildren);
          //   firstLevelChildren = firstLevelChildren.filter(
          //     (elem) => !targets.includes(elem.id)
          //   );
          //   // console.log('first-level-children-2', firstLevelChildren);
          //   firstLevelChildren.forEach((elem) => {
          //     if (elem["source"] !== undefined && targets.includes(elem.source)) {
          //       targets.push(elem.target);
          //     }
          //   });
          //   setTargetElements({
          //     [element.id]: targets,
          //   });
          //   firstLevelChildren = firstLevelChildren.filter(
          //     (elem) => !targets.includes(elem.source)
          //   );
          //   // console.log('first-level-children-3', firstLevelChildren);
          //   firstLevelChildren = firstLevelChildren.filter(
          //     (elem) => !targets.includes(elem.id)
          //   );
          //   console.log("first-level-children-final", firstLevelChildren);
          //   setToggledElements(firstLevelChildren);
          // } else {
          //   const firstLevelChildren = _elements.filter(
          //     (elem) =>
          //       elem.source === element.id ||
          //       targetElements[element.id].includes(elem.id) ||
          //       targetElements[element.id].includes(elem.source)
          //   );
          //   console.log("first-level-children", firstLevelChildren);
          //   setToggledElements([...toggledElements, ...firstLevelChildren]);
          //   const _targetElements = JSON.parse(JSON.stringify(targetElements));
          //   delete _targetElements[element.id];
          //   setTargetElements(_targetElements);
          // }
          // setElementClicked(element);
        }
      }
    }
  };

  useEffect(() => {
    fetch(`${apiUrl}/api/get-user-info`, {
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
        console.log("testtttttttttt", json);
        let newElements = [];
        const jsonElements = JSON.parse(json.elements);
        if (jsonElements.length === 0) {
          newElements = [];
        } else {
          if (jsonElements.hasOwnProperty(currentFile.id)) {
            newElements = jsonElements[currentFile.id];
          } else {
            newElements = [];
          }
        }
        console.log(newElements);
        setElements(newElements);
        setTags(JSON.parse(json.tags));
      });
  }, [currentFile]);

  const onNodeDragStop = (event, node) => {
    const newElements = [...elements];
    // console.log(newElements);
    newElements.map((element) => {
      if (element.id === node.id) {
        element.position = node.position;
      }
    });
    setElements(newElements);
  };

  const handleClose = () => {
    setOpenNewNode(false);
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
    updateNode(newElements);
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
    updateNode(newElements);
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
    updateNode(newElements);
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
    updateElementsDb(update, currentFile);
    setElementClicked({});
  };

  const handleClickDescription = () => {
    setEditModeDescription(true);
  };

  const getNodeId = () => `randomnode_${+new Date() + Math.random()}`;

  const updateNode = (element = elements) => {
    const newElements = [...element];
    const newCurrent = { ...currentFile };
    newCurrent.elements = newElements;
    setElements(newElements);
    updateElementsDb(newElements, currentFile);
  };
  const addNode = (type, position = { x: 100, y: 0 }) => {
    let newElements = elements ? [...elements] : [];
    newElements.push({
      id: getNodeId(),
      node: currentFile.id,
      type: type,
      data: {
        title: "title",
        description: type === "special" ? [{ key: "", value: "" }] : null,
        color: selectedColor,
        isCollapsable: true,
        hasAnimatedEdge: false,
        hasArrowEdge: false,
        tags: [],
      },
      targetPosition: orientation === "horizontal" ? "left" : "top",
      sourcePosition: orientation === "horizontal" ? "right" : "bottom",
      isHidden: false,
      position: position,
    });
    const newCurrent = { ...currentFile };
    newCurrent.elements = newElements;
    setElements(newElements);
  };

  const handleChangeArrow = async () => {
    const edges = await getConnectedEdges([elementCLicked], elements);
    const newElements = [...elements];
    let elementClickedIndex;
    edges.map((edge) => {
      newElements.map((element, index) => {
        if (isEdge(element)) {
          if (element.id === edge.id) {
            console.log(element);
            element.arrowHeadType =
              hasArrowEdge === true ? null : "arrowclosed";
          }
        } else {
          if (element.id === elementCLicked.id) {
            elementClickedIndex = index;
          }
        }
      });
    });
    newElements[elementClickedIndex].data.hasArrowEdge =
      !newElements[elementClickedIndex].data.hasArrowEdge;
    setArrowEdge(!hasArrowEdge);
    console.log(newElements[elementClickedIndex].data.hasArrowEdge);
    setElements(newElements);
    updateNode(newElements);
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
    updateNode(newElements);
  };

  const onDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  const onDrop = (event) => {
    event.preventDefault();

    const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
    const type = event.dataTransfer.getData("application/reactflow");
    const position = reactFlowInstance.project({
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top,
    });
    addNode(type, position);
  };

  // useEffect(() => {
  //   if (elements.length > 0) {
  //   }
  // }, [elements]);

  // console.log('target-elements', targetElements);
  // console.log('toggled-elemetns', toggledElements);

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
    setFirstTime(true);
    setEditMode(!isEditMode);
  };

  const handleChangeCollapsable = () => {
    console.log("YYYYYYYYYYYYYGUKB");
    const newElements = [...elements];
    newElements.map((element) => {
      if (element.id === elementCLicked.id) {
        console.log(!element.data.isCollapsable);
        element.data.isCollapsable = !isCollapsable;
      }
    });
    setCollapsable(!isCollapsable);
    updateNode(newElements);
  };

  const hexToRgb = (hex) => {
    console.log(hex);
    var c;
    if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
      console.log("yayyyyyyyyyyyyy");
      c = hex.substring(1).split("");
      if (c.length == 3) {
        c = [c[0], c[0], c[1], c[1], c[2], c[2]];
      }
      c = "0x" + c.join("");
      return { r: (c >> 16) & 255, g: (c >> 8) & 255, b: c & 255, a: 1 };
    }
    return {
      r: "193",
      g: "230",
      b: "255",
      a: "100",
    };
  };

  const parseDescription = (des) => {
    const lst = des.split(",");
    const finalLst = [];
    lst.map((pair) => {
      const newPair = pair.split(":");
      finalLst.push({ key: newPair[0], value: newPair[1] });
    });
    return finalLst;
  };

  const submitField = () => {
    const newElements = [...elements];
    newElements.map((element) => {
      if (element.id === elementCLicked.id) {
        element.data.description.push(field);
      }
    });
    setElements(newElements);
    updateNode(newElements);
    setOpenNewField(false);
  };

  const handleChangeAnimated = () => {
    const edges = getConnectedEdges([elementCLicked], elements);
    const newElements = [...elements];
    let elementClickedIndex;
    edges.map((edge) => {
      newElements.map((element, index) => {
        if (isEdge(element)) {
          if (element.id === edge.id) {
            console.log(element);
            element.animated = !hasAnimatedEdge;
          }
        } else {
          if (element.id === elementCLicked.id) {
            elementClickedIndex = index;
          }
        }
      });
    });
    newElements[elementClickedIndex].data.hasAnimatedEdge =
      !newElements[elementClickedIndex].data.hasAnimatedEdge;
    setAnimatedEdge(!hasAnimatedEdge);
    setElements(newElements);
    updateNode(newElements);
  };

  const checkTags = (tags2Check) => {
    console.log(tags);
    if (tags2Check.length === 0) {
      return [];
    } else {
      const newTags = tags2Check.split(",");
      if (tags.length === 0) {
        return {
          value: true,
          msg: "One or more of the tags provided does not exist.",
        };
      }
      newTags.map((tag) => {
        if (!tags.includes(tag)) {
          return {
            value: true,
            msg: "One or more of the tags provided does not exist.",
          };
        }
      });
      return newTags;
    }
  };

  console.log("elements", elements);

  let filteredElements;

  if (elements.length === 0) {
    filteredElements = [];
  } else {
    console.log(elements, "***********************88");
    filteredElements = elements.filter((data) => {
      return data.node === currentFile.id || data.source;
    });
    filteredElements.sort((a, b) => {
      if (a.hasOwnProperty("data") && b.hasOwnProperty("data")) {
        return parseInt(a.id.slice(11, 24)) - parseInt(b.id.slice(11, 24));
      }
    });
  }
  if (!isEditMode) {
    filteredElements = getLayoutedElements(
      filteredElements,
      orientation === "vertical" ? "TB" : "LR"
    );
  }
  console.log(filteredElements);
  console.log(elements);
  const classes = useStyles();

  if (currentFile === null) {
    return <div></div>;
  } else {
    return (
      <>
        <Grid container direction="row" spacing={3} style={{ width: "80%" }}>
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
                  // style={{ overflow: "hidden" }}
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
          <Grid item xs={2}>
            <Grid item xs={6}>
              <Typography
                variant="h6"
                gutterBottom
                style={{ paddingTop: 10, fontWeight: "bold" }}
              >
                {`Project: ${currentFile.parentId}`}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h6" gutterBottom>
                {`Sub Process: ${currentFile.text}`}
              </Typography>
            </Grid>
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
                      // console.log(
                      //   elements,
                      //   "t8934ufjhn888ewhyobfo8ulh74uilw748ofulufo47fuligo7t357grlgt57grsg7rsty7osrlgwyot7rswy7hsgywo7hrlgwy7oglyo4rhgyotrglyo4rgyot7r"
                      // );
                      updateNode([...elements]);
                    }}
                  >
                    Save
                  </Button>
                )}
                <Button
                  variant="contained"
                  color="primary"
                  style={{ marginLeft: isEditMode ? 10 : 60 }}
                  startIcon={<CloudUploadIcon />}
                  onClick={() => {
                    setOpenUpload(true);
                  }}
                >
                  Import CSV
                </Button>
                <DropzoneDialogBase
                  clearOnUnmount={true}
                  filesLimit={1}
                  dialogTitle={
                    <>
                      {console.log(renderAlert)}
                      {renderAlert.value && (
                        <Alert severity="error">{renderAlert.msg}</Alert>
                      )}
                      <span>Upload file</span>
                      <IconButton
                        style={{
                          right: "12px",
                          top: "8px",
                          position: "absolute",
                        }}
                        onClick={() => setOpenUpload(false)}
                      >
                        <CloseIcon />
                      </IconButton>
                    </>
                  }
                  acceptedFiles={[".csv"]}
                  fileObjects={fileObjects}
                  cancelButtonText={"cancel"}
                  showAlerts={["error", "info"]}
                  submitButtonText={"submit"}
                  maxFileSize={5000000}
                  open={openUpload}
                  onAdd={(newFileObjs) => {
                    console.log("onAdd", newFileObjs);
                    if (fileObjects.length === 0) {
                      setFileObjects([].concat(fileObjects, newFileObjs));
                    }
                  }}
                  onDelete={(deleteFileObj) => {
                    const newFilesObjects = [...fileObjects].filter(
                      (item) => item !== deleteFileObj
                    );
                    setFileObjects(newFilesObjects);
                    console.log("onDelete", deleteFileObj);
                  }}
                  onClose={() => setOpenUpload(false)}
                  onSave={() => {
                    console.log(fileObjects[0]);
                    Papa.parse(fileObjects[0].file, {
                      complete: function (results) {
                        let data = results.data;
                        let jsonArr = [];
                        const ids = {};
                        const children = {};
                        const animateds = [];
                        const edgeTypes = {};
                        const arrows = [];
                        data = data.slice(1);
                        data.map((element) => {
                          const checkedTags = checkTags(element[4]);
                          console.log(checkedTags, "7777777777777777777");
                          console.log(element[5]);
                          if (
                            [
                              "special",
                              "oval",
                              "rectangle",
                              "diamond",
                            ].includes(element[5].toLowerCase())
                          ) {
                            if (Array.isArray(checkedTags)) {
                              ids[element[0]] = getNodeId();
                              jsonArr.push({
                                id: ids[element[0]],
                                node: currentFile.id,
                                type: element[5],
                                data: {
                                  title: element[1],
                                  description:
                                    element[2].length === 0
                                      ? null
                                      : parseDescription(element[2]),
                                  color: element[3].startsWith("#")
                                    ? hexToRgb(element[3])
                                    : {
                                        r: "193",
                                        g: "230",
                                        b: "255",
                                        a: "100",
                                      },
                                  tags: checkedTags,
                                  isCollapsable:
                                    element[6] === "TRUE" ? true : false,
                                },
                                isHidden: false,
                                position: { x: 0, y: 0 },
                              });
                              if (element[8] === "TRUE") {
                                animateds.push(ids[element[0]]);
                              }
                              if (element[9] === "step") {
                                edgeTypes[ids[element[0]]] = "step";
                              } else {
                                edgeTypes[ids[element[0]]] = "curved";
                              }
                              if (element[10] === "TRUE") {
                                arrows.push(ids[element[0]]);
                              }
                              console.log(jsonArr);
                              if (element[7].length > 0) {
                                if (element[7].includes(",")) {
                                  const csvChildren = element[7].split(",");
                                  children[element[0]] = csvChildren;
                                }
                              }
                            } else {
                              console.log(checkedTags);
                              // setRenderAlert(checkedTags);
                              setRenderAlert({
                                value: true,
                                msg: "One or more of the tags provided does not exist.",
                              });
                            }
                          } else {
                            console.log("test");
                            setRenderAlert({
                              value: true,
                              msg: "A type of shape in the file does not exist.",
                            });
                          }
                        });
                        console.log(jsonArr);
                        console.log("Finished:", results.data);
                        console.log("onSave", fileObjects);
                        console.log(jsonArr.length);
                        if (jsonArr.length === data.length) {
                          console.log(ids);
                          console.log(children);
                          for (var key in children) {
                            if (children.hasOwnProperty(key)) {
                              if (Array.isArray(children[key])) {
                                children[key].map((child) => {
                                  const edge = addEdge(
                                    {
                                      animated: animateds.includes(ids[key])
                                        ? true
                                        : false,
                                      type: edgeTypes[ids[key]],
                                      arrowHeadType: arrows.includes(ids[key])
                                        ? "arrowclosed"
                                        : null,
                                      source: ids[key],
                                      target: ids[child],
                                    },
                                    jsonArr
                                  );
                                  console.log(edge);
                                  jsonArr = edge;
                                });
                              } else {
                                const edge = addEdge(
                                  {
                                    animated: animateds.includes(ids[key])
                                      ? true
                                      : false,
                                    type: edgeTypes[ids[key]],
                                    arrowHeadType: arrows.includes(ids[key])
                                      ? "arrowclosed"
                                      : null,
                                    source: ids[key],
                                    target: ids[children[key]],
                                  },
                                  jsonArr
                                );
                                console.log(edge);
                                jsonArr = edge;
                              }
                            }
                          }
                          const layoutedElements = getLayoutedElements(jsonArr);
                          setElements(layoutedElements);
                          updateNode(layoutedElements);
                          console.log(jsonArr);
                          setCsv(true);
                          setOpenUpload(false);
                        }
                      },
                    });
                  }}
                  showPreviewsInDropzone={false}
                  useChipsForPreview
                  previewGridProps={{
                    container: { spacing: 1, direction: "row" },
                  }}
                  previewChipProps={{ classes: { root: classes.previewChip } }}
                  showFileNamesInPreview={true}
                />
                <Snackbar
                  open={renderAlert.value}
                  autoHideDuration={5000}
                  onClose={() => setRenderAlert({ value: false, msg: "" })}
                >
                  <Alert
                    onClose={() => setRenderAlert({ value: false, msg: "" })}
                    severity="error"
                  >
                    {renderAlert.msg}
                  </Alert>
                </Snackbar>
              </Grid>
            </Typography>
          </Grid>
        </Grid>
        <Divider orientation="horizontal" />
        <ReactFlowProvider>
          <div className="reactflow-wrapper" ref={reactFlowWrapper}>
            <ReactFlow
              nodeTypes={{
                special: SpecialNodeComponent,
                oval: OvalNodeComponent,
                rectangle: RectangleNodeComponent,
                diamond: DiamondNodeComponent,
              }}
              elements={
                Object.keys(targetElements).length !== 0
                  ? toggledElements
                  : filteredElements
              }
              // elements={filteredElements}
              onElementsRemove={onElementsRemove}
              onNodeDoubleClick={onElementClick}
              onElementClick={onNodeClick}
              onDrop={onDrop}
              onDragOver={onDragOver}
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
          </div>
        </ReactFlowProvider>
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
                        Add Field
                      </Typography>
                      <Button
                        variant="outlined"
                        startIcon={<AddIcon />}
                        color="secondary"
                        onClick={() => setOpenNewField(true)}
                      >
                        Add
                      </Button>
                      <Dialog
                        open={openNewField}
                        onClose={handleCloseField}
                        aria-labelledby="form-dialog-title"
                      >
                        <DialogTitle id="form-dialog-title">
                          Add New Field
                        </DialogTitle>
                        <DialogContent>
                          <div style={{ textAlign: "center" }}>
                            <TextField
                              style={{ width: "40%", marginRigh: 10 }}
                              label="Key"
                              id="outlined-size-small"
                              defaultValue="Key"
                              variant="outlined"
                              size="small"
                              onChange={(event) => {
                                const newField = { ...field };
                                newField.key = event.target.value;
                                setField(newField);
                              }}
                            />
                            <TextField
                              style={{ width: "40%", marginLeft: 10 }}
                              label="Value"
                              id="outlined-size-normal"
                              defaultValue="Value"
                              onChange={(event) => {
                                const newField = { ...field };
                                newField.value = event.target.value;
                                setField(newField);
                              }}
                              variant="outlined"
                              size="small"
                            />
                          </div>
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={handleCloseField} color="primary">
                            Cancel
                          </Button>
                          <Button onClick={submitField} color="primary">
                            Add
                          </Button>
                        </DialogActions>
                      </Dialog>
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
                  <Typography component="div">
                    <Grid
                      component="label"
                      container
                      alignItems="center"
                      spacing={1}
                      style={{ paddingTop: 20, paddingLeft: 40 }}
                    >
                      <Grid item>
                        <Switch
                          color="primary"
                          checked={isCollapsable}
                          onClick={() => handleChangeCollapsable()}
                          name="checked2"
                        />
                      </Grid>
                      <Grid item>Collapsable</Grid>
                    </Grid>
                  </Typography>
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
                  <Grid
                    item
                    xs={12}
                    style={{
                      textAlign: "start",
                      maxHeight: "100%",
                      overflow: "auto",
                    }}
                  >
                    <FormControl
                      variant="outlined"
                      style={{ width: 150, marginTop: 30, marginLeft: 20 }}
                    >
                      <InputLabel id="demo-simple-select-outlined-label">
                        EdgeType
                      </InputLabel>
                      <Select
                        style={{ fontSize: 15 }}
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        onChange={handleChangeEdgeType}
                        variant="outlined"
                        label="EdgeType"
                        defaultValue="smoothstep"
                        displayEmpty={true}
                      >
                        <MenuItem value="smoothstep">Step Edge</MenuItem>
                        <MenuItem value="default">Curved Edge</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Typography component="div">
                    <Grid
                      component="label"
                      container
                      alignItems="center"
                      spacing={1}
                      style={{ paddingTop: 20, paddingLeft: 40 }}
                    >
                      <Grid item>
                        <Switch
                          color="primary"
                          checked={hasAnimatedEdge}
                          onClick={() => handleChangeAnimated()}
                          name="checked3"
                        />
                      </Grid>
                      <Grid item>Animated</Grid>
                    </Grid>
                  </Typography>
                  <Typography component="div">
                    <Grid
                      component="label"
                      container
                      alignItems="center"
                      spacing={1}
                      style={{ paddingTop: 20, paddingLeft: 40 }}
                    >
                      <Grid item>
                        <Switch
                          color="primary"
                          checked={hasArrowEdge}
                          onClick={() => handleChangeArrow()}
                          name="checked4"
                        />
                      </Grid>
                      <Grid item>Arrow</Grid>
                    </Grid>
                  </Typography>
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