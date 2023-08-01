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
import { createSub } from "../../../../functions/sub";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
const AddSub = ({ open, onClose, data }) => {
  const [name, setName] = React.useState();
  const { user } = useSelector((state) => ({ ...state }));
  const [openAdd, setOpenAdd] = React.useState(open);
  const [category, setCategory] = React.useState("");
  const theme = useTheme();
  const [categories, setCategories] = React.useState([]);
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  React.useEffect(() => {
    loadCategories();
  }, []);
  const loadCategories = () =>
    getCategories().then((c) => setCategories(c.data));
  const handleChangeAdd = () => {
    setOpenAdd(false);
  };
  const handleAddName = (event) => {
    setName(event.target.value);
    console.log("check ", name);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(name);
    createSub({ name, parent: category }, user.token)
      .then((res) => {
        // console.log(res)
        setName("");
        toast.success(`"${res.data.name}" is created`);
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
        <DialogTitle>Add Sub Category</DialogTitle>
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
            />
            <FormControl fullWidth style={{ marginLeft: 12, marginTop: 8 }}>
              <InputLabel id="demo-simple-select-label">Age</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={category}
                label="Category"
                onChange={(e) => setCategory(e.target.value)}
              >
                {categories.length > 0 &&
                  categories.map((c) => (
                    <MenuItem key={c._id} value={c._id}>
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
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default AddSub;
