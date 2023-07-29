import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { toast } from "react-toastify";
import { getCategories, removeCategory, updateCategory } from "../../../../functions/category";
import { useSelector } from "react-redux";

import { Navigate } from "react-router-dom";
const Editcategory = ({ open, onClose, data, initData }) => {
  const [name, setName] = React.useState();
  const { user } = useSelector((state) => ({ ...state }));
  useEffect(() => {
    setName(initData.name);
  }, []);
  const handleAddName = (event) => {
    setName(event.target.value);
  };

  const handleSubmit = (e) => {
    console.log("checknbemr",name);
    e.preventDefault();
    // console.log(name);
    updateCategory(initData._id, { name }, user.token)
      .then((res) => {
        // console.log(res)
        setName("");
        data();
        onClose();
        toast.success(`"${res.data.name}" is updated`);
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };
  const handleRemove = async () => {
    // let answer = window.confirm("Delete?");
    // console.log(answer, slug);
    if (window.confirm("Delete?")) {
      removeCategory(initData._id, user.token)
        .then((res) => {
          toast.error(`${res.data.name} deleted`);
          data();
          onClose();
        })
        .catch((err) => {
          if (err.response.status === 400) {
            toast.error(err.response.data);
          }
        });
    }
  };
  return (
    <div>
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="responsive-dialog-title"
        maxWidth="sm"
        fullWidth="true"
      >
        <DialogTitle>Edit Category</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name category"
            type="text"
            fullWidth
            variant="outlined"
            value={name === undefined ? initData.name : name}
            onChange={(event) => handleAddName(event)}
          />
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="inherit" onClick={() => onClose()}>
            Cancel
          </Button>
          <Button variant="contained" color="error" onClick={() => handleRemove()}>
            Delete
          </Button>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default Editcategory;
