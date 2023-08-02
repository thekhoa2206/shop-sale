import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { Box } from '@material-ui/core';
import { createCoupon } from '../../../functions/coupon';
import InputAdornment from '@mui/material/InputAdornment';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
const AddCopoun = ({ open, onClose,data }) => {
    const [value, setValue] = React.useState(null);
  const [name, setName] = React.useState();
  const { user } = useSelector((state) => ({ ...state }));
  const [openAdd, setOpenAdd] = React.useState(open);
  const theme = useTheme();
  const [expiry, setExpiry] = React.useState("");
  const [discount, setDiscount] = React.useState("");
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const handleChangeAdd = () => {
    setOpenAdd(false);
  }
  const handleAddName = (event) => {
    setName(event.target.value);
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.table(name, expiry, discount);
    createCoupon({ name, expiry, discount }, user.token)
      .then((res) => {
        setName("");
        setDiscount("");
        setExpiry("");
        toast.success(`"${res.data.name}" is created`);
        data();
        onClose();
      })
      .catch((err) => console.log("create coupon err", err));
  };
  return (

    <div>
      <Dialog open={open} onClose={handleChangeAdd} aria-labelledby="responsive-dialog-title" maxWidth='sm' fullWidth='true'  >
        <DialogTitle>Add Category</DialogTitle>
        <DialogContent>
        <Box display={"flex"}>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name Copoun"
            type="text"
            fullWidth
            variant="outlined"
            onChange={(event) => handleAddName(event)}
          />
          <TextField style={{marginLeft: 12}}
            autoFocus
            margin="dense"
            id="discount"
            label="Discount"
            type="text"
            fullWidth
            variant="outlined"
            onChange={(event) => setDiscount(event.target.value)}
            InputProps={{
                endAdornment: <InputAdornment position="end">%</InputAdornment>,
              }}
          />
          </Box>
          <Box>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker']}>
        <DatePicker value={expiry} onChange={(newValue) => setExpiry(newValue)} />
      </DemoContainer>
    </LocalizationProvider>
    </Box>
        </DialogContent>
        <DialogActions>
          <Button variant='contained' color='error' onClick={() => onClose()}>Cancel</Button>
          <Button variant='contained' color='primary' onClick={handleSubmit}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default AddCopoun;