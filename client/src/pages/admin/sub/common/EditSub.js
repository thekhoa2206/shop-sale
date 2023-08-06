import { Box } from "@material-ui/core";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import * as React from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getCategories } from "../../../../functions/category";
import { updateSub } from "../../../../functions/sub";
const EditSub = ({ open, onClose, data, initData, category }) => {
  const [name, setName] = React.useState(undefined);
  const { user } = useSelector((state) => ({ ...state }));
  const [openAdd, setOpenAdd] = React.useState(open);
  const theme = useTheme();
  const [categories, setCategories] = React.useState([]);
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [parent, setParent] = React.useState("");
  React.useEffect(() => {
    setName(initData.name);
    if(category) setParent(category._id)
    loadCategories();
  }, [category]);
  const loadCategories = () =>
    getCategories().then((c) => setCategories(c.data));
  const handleChangeEdit = (event) => {
    setParent(event.target.value);
  };
  const handleAddName = (event) => {
    setName(event.target.value);
  };
  const handleSubmit = (name,parent) => {
    let name1 = name !== undefined ? name : initData.name;

    if(!parent){
      toast.error(`Category no empty`);
      return;
    }
    let parent1 = parent!== undefined ? parent : category._id;
    if(!name1){
      toast.error(`Name sub category no empty`);
      return;
    }
    updateSub(initData.slug, {name: name1 ,parent: parent1}, user.token)
      .then((res) => {
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
              label="Name Sub category"
              type="text"
              fullWidth
              variant="outlined"
              onChange={(event) => handleAddName(event)}
              value={name === undefined ? initData.name : name}
            />
            <FormControl fullWidth style={{ marginLeft: 12, marginTop: 8 }}>
              <InputLabel id="demo-simple-select-label">Category</InputLabel>
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
                      key={c._id}
                      value={c._id}
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
