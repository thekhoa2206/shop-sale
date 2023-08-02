import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { Box } from "@material-ui/core";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { changeStatus } from "../../functions/admin";
const OrderStatus = ({ open, onClose, data,load }) => {
  const [name, setName] = React.useState();
  const { user } = useSelector((state) => ({ ...state }));
  const [openAdd, setOpenAdd] = React.useState(open);
  const [status, setStatus] = React.useState();
  const theme = useTheme();
  const [categories, setCategories] = React.useState([]);
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleStatusChange = () => {
    let dataStatus = status !== undefined ? status : data.orderStatus
    changeStatus(data._id, dataStatus, user.token).then((res) => {
      toast.success("Status updated");
      load();
      onClose();
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
        <DialogTitle>Change Order Status</DialogTitle>
        <DialogContent>
          <Box display={"flex"}>
            <FormControl fullWidth style={{ marginLeft: 12, marginTop: 8 }}>
              <InputLabel id="demo-simple-select-label">Status</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={status !== undefined ? status : data.orderStatus}
                label="Status"
                onChange={(e) => setStatus(e.target.value)}
              >       <MenuItem value="Not Processed">Not Processed</MenuItem>
                      <MenuItem value="Cash On Delivery">Cash On Delivery</MenuItem>
                      <MenuItem value="Processing">Processing</MenuItem>
                      <MenuItem value="Dispatched">Dispatched</MenuItem>
                      <MenuItem value="Cancelled">Cancelled</MenuItem>
                      <MenuItem value="Completed">Completed</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="error" onClick={() => onClose()}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={handleStatusChange}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default OrderStatus;
