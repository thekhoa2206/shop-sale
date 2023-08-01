import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { toast } from "react-toastify";
import { createCategory, getCategories } from "../../../../functions/category";
import { useSelector } from "react-redux";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { Box } from "@material-ui/core";
import { createSub, updateSub } from "../../../../functions/sub";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
const EditSub = ({ open, onClose, data, initData,categoryName }) => {
  const [name, setName] = React.useState(undefined);
  const { user } = useSelector((state) => ({ ...state }));
  const [openAdd, setOpenAdd] = React.useState(open);
  const [category, setCategory] = React.useState("");
  const theme = useTheme();
  const [categories, setCategories] = React.useState([]);
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [parent, setParent] = React.useState("");
  React.useEffect(() => {
    setName(initData.name);
    setParent(categoryName)
    loadCategories();
  }, []);
  const loadCategories = () =>
    getCategories().then((c) => setCategories(c.data));
  const handleChangeEdit = (event) => {
    setParent(event.target.value);
  };
  const handleAddName = (event) => {
    setName(event.target.value);
  };
  const handleSubmit = (name,parent) => {
    console.log(initData);
    let name1 = name === undefined ? name : initData.name;
    let parent1 = parent=== undefined ? parent :categoryName;
    updateSub(initData.slug, {name1 ,parent1}, user.token)
      .then((res) => {
        setName("");
        toast.success(`updated compelete`);
        data();
        onClose();
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 400) toast.error(err.response.data);
      });
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
        <DialogTitle>Edit Sub Category</DialogTitle>
        <DialogContent>
          <Box display={"flex"}>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Name category"
              type="text"
              fullWidth
              variant="outlined"
              onChange={(event) => handleAddName(event)}
              value={name === undefined ? initData.name : name}
            />
            <FormControl fullWidth style={{ marginLeft: 12, marginTop: 8 }}>
              <InputLabel id="demo-simple-select-label">{categoryName}</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={parent}
                label="Category"
                onChange={(event)=>handleChangeEdit(event)}
              >
                {categories.length > 0 &&
                  categories.map((c) => (
                    <MenuItem
                      value={c.name}
                      >
                      {c.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="error" onClick={() => onClose()}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={()=>handleSubmit(name,parent)}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default EditSub;
