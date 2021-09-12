import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import { Button, Typography, Divider, IconButton } from "@material-ui/core";
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

const SideBar = () => {
  const [files, setFiles] = useState(
    localStorage.getItem("files") === null
      ? []
      : JSON.parse(localStorage.getItem("files"))
  );
  const [currentFile, setCurrentFile] = useState(
    localStorage.getItem("current") === null
      ? {}
      : JSON.parse(localStorage.getItem("current"))
  );
  const [folder, setFolder] = useState("");
  const [file, setFile] = useState("");
  const [openNewFolder, setOpenNewFolder] = React.useState(false);
  const [openNewTag, setOpenNewTag] = useState(false);
  const [error, setError] = useState({ value: false, msg: "" });
  const [names, setNames] = useState(
    localStorage.getItem("names") === null
      ? []
      : JSON.parse(localStorage.getItem("names"))
  );
  const [tagError, setTagError] = useState({});
  const [tag, setTag] = useState("");
  const [tags, setTags] = useState(
    localStorage.getItem("tags") === null
      ? []
      : JSON.parse(localStorage.getItem("tags"))
  );
  const [openNewFile, setOpenNewFile] = React.useState(false);
  const [openEditTag, setOpenEditTag] = useState(false);
  const [currentEditTag, setCurrentEditTag] = useState("");
  const [editTag, setEditTag] = useState("");
  const [editTagError, setEditTagError] = useState({});

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
        localStorage.setItem("files", JSON.stringify(newFiles));
        const newNames = [...names];
        newNames.push(folder);
        setNames(newNames);
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
        if (!"parentId" in newFiles[0]) {
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
          localStorage.setItem("files", JSON.stringify(newFiles));
          const newNames = [...names];
          newNames.push(file);
          setNames(newNames);
          localStorage.setItem("names", JSON.stringify(newNames));
          setError({});
          setOpenNewFile(false);
        }
      }
    }
  };

  const deleteItem = () => {
    const newFiles = [...files];
    const index = files.findIndex((element) => element === currentFile);
    newFiles.splice(index, 1);
    const newNames = [...names];
    const namesIndex = names.indexOf(currentFile.id);
    newNames.splice(namesIndex, 1);
    setNames(newNames);
    localStorage.setItem("names", JSON.stringify(newNames));
    setFiles(newFiles);
    localStorage.setItem("files", JSON.stringify(newFiles));
    localStorage.removeItem("current");
    setCurrentFile({});
    setCurrentFile({});
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
    localStorage.setItem("tags", JSON.stringify(newTags));
  };

  const handleChangeEditTag = (event) => {
    setEditTag(event.target.value);
  };

  return (
    <div>
      <Grid
        item
        xs={12}
        style={{
          height: "70vh",
          textAlign: "center",
          backgroundColor: "#F2F2F2",
        }}
      >
        <Typography variant="h5" gutterBottom style={{ padding: 10 }}>
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
            <DialogTitle id="form-dialog-title">Create New Folder</DialogTitle>
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
                setCurrentFile(e.itemData);
                if (!e.itemData.hasOwnProperty("expanded")) {
                  localStorage.setItem("current", JSON.stringify(e.itemData));
                }
              }}
            />
          )}
        </Grid>
      </Grid>
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
