import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import {
  Button,
  Typography,
  Divider,
  IconButton,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  FormControlLabel,
  RadioGroup,
  FormLabel,
  Radio,
} from "@material-ui/core";
import CreateNewFolderIcon from "@material-ui/icons/CreateNewFolder";
import DeleteIcon from "@material-ui/icons/Delete";
import NoteAddIcon from "@material-ui/icons/NoteAdd";
import AddIcon from "@material-ui/icons/Add";
import TreeView from "devextreme-react/tree-view";
import "devextreme/dist/css/dx.light.css";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import EditIcon from "@material-ui/icons/Edit";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import reactCSS from "reactcss";
import { SketchPicker } from "react-color";
import { Tabs, Tab } from "@material-ui/core";
import StorageIcon from "@material-ui/icons/Storage";
import PermDataSettingIcon from "@material-ui/icons/PermDataSetting";
// https://flowchart-backend.herokuapp.com
// http://127.0.0.1:8000
const apiUrl = "https://flowchart-backend.herokuapp.com";

const SideBar = ({
  currentFile,
  setCurrentFile,
  setCanvasVisibility,
  setEdgeType,
  setSelectedColor,
  isEditMode,
  setOrientation,
  orientation,
}) => {
  const [files, setFiles] = useState([]);
  const [folder, setFolder] = useState("");
  const [file, setFile] = useState("");
  const [openNewFolder, setOpenNewFolder] = React.useState(false);
  const [openNewTag, setOpenNewTag] = useState(false);
  const [error, setError] = useState({ value: false, msg: "" });
  const [names, setNames] = useState([]);
  const [tagError, setTagError] = useState({});
  const [tag, setTag] = useState("");
  const [tags, setTags] = useState([]);
  const [openNewFile, setOpenNewFile] = React.useState(false);
  const [openEditTag, setOpenEditTag] = useState(false);
  const [currentEditTag, setCurrentEditTag] = useState("");
  const [editTag, setEditTag] = useState("");
  const [editTagError, setEditTagError] = useState({});
  const [activeFolder, setActiveFolder] = useState(false);
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const [color, setColor] = useState({
    r: "193",
    g: "230",
    b: "255",
    a: "100",
  });
  const [value, setValue] = useState(0);

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
        let newTags;
        if (Array.isArray(json.tags)) {
          newTags = json.tags;
        } else {
          newTags = JSON.parse(json.tags);
        }
        let newNames;
        if (Array.isArray(json.names)) {
          newNames = json.names;
        } else {
          newNames = JSON.parse(json.names);
        }
        console.log(newTags);
        console.log(newNames);
        console.log(JSON.parse(json.files));
        setTags(newTags);
        setNames(newNames);
        setFiles(JSON.parse(json.files));
      });
  }, []);

  const handleChange = (event, newValue) => {
    console.log(newValue);
    setValue(newValue);
  };

  const handleChangeOrientation = (event) => {
    setOrientation(event.target.value);
  };

  const newFolder = () => {
    setOpenNewFolder(true);
  };

  const newFile = () => {
    setOpenNewFile(true);
  };

  const handleClose = () => {
    setFolder("");
    setFile("");
    setOpenNewTag(false);
    setOpenEditTag(false);
    setCurrentEditTag(false);
    setEditTag(false);
    setEditTagError(false);
    setError({});
    openNewFolder ? setOpenNewFolder(false) : setOpenNewFile(false);
  };

  const handleChangeFolder = (event) => {
    setFolder(event.target.value);
  };

  const handleChangeFile = (event) => {
    setFile(event.target.value);
  };

  const updateFilesDb = (newElements) => {
    console.log("updating database....");
    fetch(`${apiUrl}/api/update-files`, {
      method: "POST",
      body: JSON.stringify({
        session_id: localStorage.getItem("session"),
        files: newElements,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(
          json,
          "ndsojdmsio99999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999"
        );
        setFiles(JSON.parse(json.files));
      });
  };

  const updateNamesDb = (newNames) => {
    console.log("updating database....");
    fetch(`${apiUrl}/api/update-names`, {
      method: "POST",
      body: JSON.stringify({
        session_id: localStorage.getItem("session"),
        names: newNames,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => setNames(json.names));
  };

  const updateElementsDb = (newElements, isDelete = false) => {
    console.log("updating database....");
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
      .then((json) => console.log(json));
  };

  const updateTagsDb = (newTags) => {
    console.log("updating database....");
    fetch(`${apiUrl}/api/update-tags`, {
      method: "POST",
      body: JSON.stringify({
        session_id: localStorage.getItem("session"),
        tags: newTags,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(JSON.parse(json.tags));
        setTags(JSON.parse(json.tags));
      });
  };

  const submitFolder = () => {
    if (folder.length === 0) {
      setError({ value: true, msg: "Folder name can not be empty." });
    } else {
      if (names.includes(folder)) {
        setError({ value: true, msg: "Folder must be unique." });
      } else {
        const newFiles = [...files];
        newFiles.push({ id: folder, text: folder, expanded: true });
        setFiles(newFiles);
        updateFilesDb(newFiles);
        localStorage.setItem("files", JSON.stringify(newFiles));
        const newNames = names.length === 0 ? [] : [...names];
        newNames.push(folder);
        console.log(folder);
        setNames(newNames);
        updateNamesDb(newNames);
        localStorage.setItem("names", JSON.stringify(newNames));
        setError({});
        setOpenNewFolder(false);
      }
    }
  };

  const submitFile = () => {
    if (file.length === 0) {
      setError({ value: true, msg: "File name can not be empty." });
    } else {
      if (names.includes(file)) {
        setError({ value: true, msg: "File name must be unique." });
      } else {
        const newFiles = [...files];
        if (newFiles[0].hasOwnProperty("parentId")) {
          setError({
            value: true,
            msg: "You must have folder to create a file.",
          });
        } else {
          newFiles.push({
            id: file,
            text: file,
            parentId: currentFile.id,
            elements: [],
          });
          setFiles(newFiles);
          updateFilesDb(newFiles);
          localStorage.setItem("files", JSON.stringify(newFiles));
          const newNames = names.length === 0 ? [] : [...names];
          newNames.push(file);
          setNames(newNames);
          localStorage.setItem("names", JSON.stringify(newNames));
          updateNamesDb(newNames);
          setError({});
          setOpenNewFile(false);
        }
      }
    }
  };

  const deleteItem = () => {
    const newFiles = JSON.parse(JSON.stringify(files));
    const index = files.findIndex((element) => element === currentFile);
    newFiles.splice(index, 1);
    const newNames = [...names];
    const namesIndex = names.indexOf(currentFile.id);
    newNames.splice(namesIndex, 1);
    setNames(newNames);
    updateNamesDb(newNames);
    localStorage.setItem("names", JSON.stringify(newNames));
    setFiles(newFiles);
    updateFilesDb(newFiles);
    localStorage.setItem("files", JSON.stringify(newFiles));
    localStorage.removeItem("current");
    const newElements = currentFile.elements.filter((data) => {
      return currentFile.id !== data.node;
    });
    setCurrentFile({});
    updateElementsDb(newElements, true);
  };

  const handleChangeTag = (event) => {
    setTag(event.target.value);
  };

  const submitTag = () => {
    if (tag.length === 0) {
      setTagError({ value: true, msg: "Tag name can not be empty." });
    } else {
      if (tags.includes(tag)) {
        setTagError({ value: true, msg: "Tag must be unique." });
      } else {
        console.log(tags);
        console.log(tag);
        const newTags = [...tags];
        newTags.push(tag);
        setTags((prevTags) => [...prevTags].concat([tag]));
        updateTagsDb(newTags);
        localStorage.setItem("tags", JSON.stringify(newTags));
        setTagError({});
        setOpenNewTag(false);
        console.log(tags);
      }
    }
  };

  const submitEditTag = (originalTag) => {
    if (editTag.length === 0) {
      setEditTagError({ value: true, msg: "Tag name can not be empty." });
    } else {
      if (tags.includes(editTag)) {
        setEditTagError({ value: true, msg: "Tag must be unique." });
      } else {
        const newTags = [...tags];
        const index = tags.indexOf(originalTag);
        newTags[index] = editTag;
        setTags(newTags);
        updateTagsDb(newTags);
        localStorage.setItem("tags", JSON.stringify(newTags));
        setEditTagError({});
        setOpenEditTag(false);
        setCurrentEditTag(false);
        setEditTag(false);
      }
    }
  };

  const deleteTag = (tag) => {
    const newTags = [...tags];
    const index = tags.findIndex((element) => element === tag);
    newTags.splice(index, 1);
    setTags(newTags);
    updateTagsDb(newTags);
    localStorage.setItem("tags", JSON.stringify(newTags));
  };

  const handleChangeEditTag = (event) => {
    setEditTag(event.target.value);
  };

  useEffect(() => {
    const canvasVisibilityHandler = (nodes) => {
      const files = nodes.filter(
        (node) =>
          node.hasOwnProperty("parentId") || node.hasOwnProperty("elements")
      );
      if (files.length && !activeFolder) setCanvasVisibility(true);
      else setCanvasVisibility(false);
    };

    canvasVisibilityHandler(files);
  }, [files, setCanvasVisibility]);

  const handleClickColor = () => {
    setDisplayColorPicker(!displayColorPicker);
  };

  const handleCloseColor = () => {
    setDisplayColorPicker(false);
  };

  const handleChangeColor = (color) => {
    setSelectedColor(color.rgb);
    setColor(color.rgb);
  };

  const handleChangeEdgeType = (event) => {
    setEdgeType(event.target.value);
  };

  const a11yProps = (index) => {
    return {
      id: `scrollable-force-tab-${index}`,
      "aria-controls": `scrollable-force-tabpanel-${index}`,
    };
  };

  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
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

  return (
    <div>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="fullWidth"
        indicatorColor="primary"
        tabItemContainerStyle={{ width: "100%" }}
        textColor="primary"
        aria-label="icon label tabs example"
      >
        <Tab icon={<StorageIcon />} label="Files" />
        <Tab icon={<PermDataSettingIcon />} label="Shapes" />
      </Tabs>
      {value === 0 ? (
        <Grid
          item
          xs={12}
          style={{
            height: "70vh",
            textAlign: "center",
            borderRight: "solid #D5D5D5 1px",
          }}
        >
          <Typography variant="h5" gutterBottom style={{ padding: 20 }}>
            Folder Structures
          </Typography>
          <Grid container spacing={0} justifyContent="center">
            <Grid item xs={4}>
              <IconButton
                aria-label="Add Folder"
                onClick={newFolder}
                color="primary"
              >
                <CreateNewFolderIcon fontSize="medium" />
              </IconButton>
            </Grid>
            <Dialog
              open={openNewFolder}
              onClose={handleClose}
              aria-labelledby="form-dialog-title"
            >
              <DialogTitle id="form-dialog-title">
                Create New Folder
              </DialogTitle>
              <DialogContent>
                <TextField
                  error={error.value ? true : false}
                  autoFocus
                  margin="dense"
                  id="folder"
                  label="Folder Name"
                  helperText={error.value && error.msg}
                  onChange={handleChangeFolder}
                  fullWidth
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Cancel
                </Button>
                <Button onClick={submitFolder} color="primary">
                  Submit
                </Button>
              </DialogActions>
            </Dialog>
            <Grid item xs={4}>
              <IconButton
                aria-label="Add File"
                color="primary"
                onClick={newFile}
                disabled={currentFile.hasOwnProperty("expanded") ? false : true}
              >
                <NoteAddIcon fontSize="medium" />
              </IconButton>
            </Grid>
            <Dialog
              open={openNewFile}
              onClose={handleClose}
              aria-labelledby="form-dialog-title"
            >
              <DialogTitle id="form-dialog-title">Create New File</DialogTitle>
              <DialogContent>
                <TextField
                  error={error.value ? true : false}
                  autoFocus
                  margin="dense"
                  id="file"
                  label="File Name"
                  onChange={handleChangeFile}
                  helperText={error.value && error.msg}
                  fullWidth
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Cancel
                </Button>
                <Button onClick={submitFile} color="primary">
                  Submit
                </Button>
              </DialogActions>
            </Dialog>
            <Grid item xs={4}>
              <IconButton
                aria-label="Delete"
                color="secondary"
                onClick={deleteItem}
                disabled={Object.keys(currentFile).length === 0 ? true : false}
              >
                <DeleteIcon fontSize="medium" />
              </IconButton>
            </Grid>
          </Grid>
          <Divider style={{ marginTop: 20 }} orientation="horizontal" />
          <Grid
            item
            xs={12}
            style={{ textAlign: "start", maxHeight: "100%", overflow: "auto" }}
          >
            {files.length === 0 ? (
              <div></div>
            ) : (
              <TreeView
                searchEnabled={true}
                style={{
                  display: "inline-block",
                  paddingLeft: 15,
                  paddingTop: 15,
                  paddingRight: 15,
                  fontSize: 18,
                  fontWeight: "normal",
                }}
                dataStructure="plain"
                id="simple-treeview"
                items={files}
                width="100%"
                onItemClick={(e) => {
                  console.log("ddd", e.itemData.hasOwnProperty("expanded"));
                  if (!e.itemData.hasOwnProperty("expanded")) {
                    localStorage.setItem("current", JSON.stringify(e.itemData));
                    setActiveFolder(false);
                    setCanvasVisibility(true);
                  } else {
                    setActiveFolder(true);
                    setCanvasVisibility(false);
                  }
                  setCurrentFile(e.itemData);
                }}
              />
            )}
          </Grid>
          <Divider style={{ marginTop: 20 }} orientation="horizontal" />
          {isEditMode && (
            <Grid container direction="column" spacing={1}>
              <Grid container direction="row" spacing={1}>
                <Grid item xs={6}>
                  <div
                    onDragStart={(event) => onDragStart(event, "special")}
                    draggable
                  >
                    <div
                      style={{
                        background: "#ADD8E6",
                        color: "black",
                        padding: 10,
                        border: "1px solid black",
                        width: 50,
                        height: 5,
                        borderRadius: "10px 10px 0px 0px",
                        textAlign: "center",
                        marginLeft: 20,
                        cursor: "pointer",
                      }}
                    ></div>
                    <div
                      style={{
                        background: "white",
                        border: "1px solid black",
                        color: "black",
                        padding: 10,
                        width: 50,
                        height: 15,
                        borderRadius: "0px 0px 10px 10px",
                        textAlign: "center",
                        marginLeft: 20,
                        cursor: "pointer",
                      }}
                    ></div>
                  </div>
                </Grid>
                <Grid item xs={6}>
                  <div
                    style={{
                      border: "1px solid black",
                      height: "60px",
                      width: "80px",
                      borderRadius: "50px",
                      cursor: "pointer",
                    }}
                    onDragStart={(event) => onDragStart(event, "oval")}
                    draggable
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
                      height: "50px",
                      width: "80px",
                      borderRadius: "10px",
                      cursor: "pointer",
                      marginLeft: 20,
                    }}
                    onDragStart={(event) => onDragStart(event, "rectangle")}
                    draggable
                  ></div>
                </Grid>
                <Grid item xs={6}>
                  <div
                    style={{
                      border: "1px solid black",
                      height: "50px",
                      width: "50px",
                      borderRadius: "5px",
                      transform: "rotate(45deg)",
                      marginLeft: "10px",
                      cursor: "pointer",
                    }}
                    onDragStart={(event) => onDragStart(event, "diamond")}
                    draggable
                  ></div>
                </Grid>
              </Grid>
            </Grid>
          )}
        </Grid>
      ) : (
        <Grid
          item
          xs={12}
          style={{
            height: "70vh",
            textAlign: "center",
            borderRight: "solid #D5D5D5 1px",
          }}
        >
          <Typography variant="h5" gutterBottom style={{ padding: 20 }}>
            Shapes Settings
          </Typography>

          <Grid
            item
            xs={12}
            style={{ textAlign: "start", maxHeight: "100%", overflow: "auto" }}
          >
            <div style={{ paddingLeft: 20, paddingTop: 20 }}>
              <Grid item xs={12} direction="row">
                <Typography variant="subtitle1" gutterBottom>
                  Node Color
                </Typography>
                <div style={styles.swatch} onClick={handleClickColor}>
                  <div style={styles.color} />
                </div>
                {displayColorPicker ? (
                  <div style={styles.popover}>
                    <div style={styles.cover} onClick={handleCloseColor} />
                    <SketchPicker color={color} onChange={handleChangeColor} />
                  </div>
                ) : null}
              </Grid>
            </div>
          </Grid>
          <Grid
            item
            xs={12}
            style={{ textAlign: "start", maxHeight: "100%", overflow: "auto" }}
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
          {!isEditMode && (
            <FormControl component="fieldset" style={{ marginTop: 30 }}>
              <FormLabel component="legend">Orientation</FormLabel>
              <RadioGroup
                aria-label="Orientation"
                name="orientation"
                value={orientation}
                onChange={handleChangeOrientation}
              >
                <FormControlLabel
                  value="vertical"
                  control={<Radio />}
                  label="Vertical"
                />
                <FormControlLabel
                  value="horizontal"
                  control={<Radio />}
                  label="Horizontal"
                />
              </RadioGroup>
            </FormControl>
          )}
        </Grid>
      )}
      <Divider orientation="horizontal" />
      <Grid
        item
        xs={12}
        style={{
          height: "30vh",
          textAlign: "center",
          backgroundColor: "#F2F2F2",
          height: "320px",
          overflowY: "scroll",
        }}
      >
        <Typography variant="h5" gutterBottom style={{ padding: 10 }}>
          Tags
        </Typography>
        <Button
          onClick={() => setOpenNewTag(true)}
          variant="outlined"
          color="primary"
          startIcon={<AddIcon />}
        >
          New Tag
        </Button>
        <Dialog
          open={openNewTag}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Create New Tag</DialogTitle>
          <DialogContent>
            <TextField
              error={tagError.value ? true : false}
              autoFocus
              margin="dense"
              id="tag"
              label="Tag Name"
              helperText={tagError.value && tagError.msg}
              onChange={handleChangeTag}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={submitTag} color="primary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
        <List>
          {tags.map((tag) => (
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <LocalOfferIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={tag} />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="edit"
                  color="primary"
                  onClick={() => {
                    setCurrentEditTag(tag);
                    setOpenEditTag(true);
                  }}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  color="primary"
                  onClick={() => deleteTag(tag)}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
          <Dialog
            open={openEditTag}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">Edit Tag</DialogTitle>
            <DialogContent>
              <TextField
                error={editTagError.value ? true : false}
                autoFocus
                type="text"
                margin="dense"
                id="tag"
                defaultValue={currentEditTag}
                label="Tag Name"
                helperText={editTagError.value && editTagError.msg}
                onChange={(e) => handleChangeEditTag(e)}
                fullWidth
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button
                onClick={() => submitEditTag(currentEditTag)}
                color="primary"
              >
                Submit
              </Button>
            </DialogActions>
          </Dialog>
        </List>
      </Grid>
    </div>
  );
};

export default SideBar;
