import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { toast } from 'react-toastify';
import { createCategory } from '../../../../functions/category';
import { useSelector } from 'react-redux';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
const Addcategory = ({ open, onClose,data }) => {
  const [name, setName] = React.useState();
  const { user } = useSelector((state) => ({ ...state }));
  const [openAdd, setOpenAdd] = React.useState(open);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const handleChangeAdd = () => {
    setOpenAdd(false);
  }
  const handleAddName = (event) => {
    setName(event.target.value);
    console.log("check ",name);
  }
  const handleSubmit = (e) => {
    if (name === undefined) {
      toast.error("name not null!")
    }

    e.preventDefault();
    // console.log(name);
    createCategory({ name }, user.token)
      .then((res) => {
        // console.log(res)
        onClose();
        setName("");
        data();
        toast.success(`"${res.data.name}" is created`);
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };
  return (

    <div>
      <Dialog open={open} onClose={handleChangeAdd} aria-labelledby="responsive-dialog-title" maxWidth='sm' fullWidth='true'  >
        <DialogTitle>Add Category</DialogTitle>
        <DialogContent>
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
        </DialogContent>
        <DialogActions>
          <Button variant='contained' color='error' onClick={() => onClose()}>Cancel</Button>
          <Button variant='contained' color='primary' onClick={handleSubmit}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default Addcategory;