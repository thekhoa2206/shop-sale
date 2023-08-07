import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { Box } from "@material-ui/core";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import * as React from "react";
import { deleteUser } from "../../../functions/admin";
import { updateUser } from "../../../functions/user";
const initialState = {
    name: "",
    phoneNumber: "",
    email: "",
    role: "",
    address:"",

};

const EditUser = ({open,data, onClose,load}) => {
    const [role, setRole] = React.useState("");
    const [users, setUsers] = React.useState(initialState);
    const [loading, setLoading] = React.useState(false);
      // redux

      React.useEffect(() => {
        setUsers(data)
      }, [data])
  const { user } = useSelector((state) => ({ ...state }));
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        // console.log(password);
        updateUser(user.token, users)
          .then(() => {
            setLoading(false);
            setUsers(initialState);
            toast.success("User updated!");
            onClose();
            load();
          })
          .catch((err) => {
            setLoading(false);
            toast.error(err.message);
          });
      };
    const handleChange = (e) => {
        setUsers({ ...users, [e.target.name]: e.target.value });
        // console.log(e.target.name, " ----- ", e.target.value);
    };
    const handleDelete = async (e) =>{
        console.log("check",data);
        e.preventDefault();
        deleteUser(data._id,user.token)
        .then(() => {
            setLoading(false);
            toast.success("Delete compelete");
            onClose();
            load();
          })
          .catch((err) => {
            setLoading(false);
            toast.error(err.message);
          });
    }
    return (
        <>
            <Dialog
                open={open}
                onClose={onClose}
                aria-labelledby="responsive-dialog-title"
                maxWidth="sm"
                fullWidth="true"
            >
                <DialogTitle> Edit Role</DialogTitle>
                <hr />
                <DialogContent>
                    <Box marginTop={"-24px"}>
                        <Box display={"flex"}>
                            <Box width={"100%"}>
                                <InputLabel style={{ color: "black", fontWeight: "500", fontSize: "16px" }}>Name</InputLabel>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="name"
                                    label="Name"
                                    type="text"
                                    fullWidth
                                    name="name"
                                    variant="outlined"
                                    value={users.name !== "" ? users.name : data.name}
                                    onChange={(e) => handleChange(e)}
                                />
                            </Box>
                            <Box width={"100%"} marginLeft={5}>
                                <InputLabel style={{ color: "black", fontWeight: "500", fontSize: "16px" }}>Address</InputLabel>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="address"
                                    label="Address"
                                    type="text"
                                    fullWidth
                                    variant="outlined"
                                    name="address"
                                    value={users.address !== "" ? users.address : data.address}
                                    onChange={(e) => handleChange(e)}
                                />
                            </Box>
                        </Box>
                        <Box display={"flex"} width={"100%"} marginTop={2}>
                            <Box width={"100%"}>
                                <InputLabel style={{ color: "black", fontWeight: "500", fontSize: "16px" }}>Email</InputLabel>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="email"
                                    label="Email"
                                    type="email"
                                    fullWidth
                                    variant="outlined"
                                    name="email"
                                    value={users.email !== "" ? users.email : data.email}
                                    onChange={(e) => handleChange(e)}
                                />
                            </Box>
                            <Box width={"100%"} marginLeft={5} marginTop={1}>
                                <InputLabel style={{ color: "black", fontWeight: "500", fontSize: "16px" }}>Role</InputLabel>
                                <FormControl fullWidth >
                                    <InputLabel id="demo-simple-select-label" marginTop={2}>Role</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={users.role !== "" ? users.role : data.role}
                                        label="Role"
                                        onChange={(e) => handleChange(e)}
                                        name="role"
                                    >
                                        <MenuItem value={'seller'}>
                                            Seller
                                        </MenuItem>
                                        <MenuItem value={'buyer '}>
                                            Buyer
                                        </MenuItem>
                                        {users.role === "admin"  && (
                                            <MenuItem value={'admin'}>
                                            Admin
                                        </MenuItem>
                                        )}
                                        {users.role === "subscriber" &&
                                            (<MenuItem value={'subscriber'}>
                                            Subscriber
                                        </MenuItem>)
                                        }
                                    </Select>
                                </FormControl>
                            </Box>
                        </Box>
                    </Box>
                </DialogContent>
                <hr />
                <DialogActions>
                <Button variant="contained" color="error" onClick={handleDelete}>
                        Delete
                    </Button>
                    <Button variant="contained" color="inherit" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button variant="contained" color="primary" onClick={handleSubmit}>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )

}
export default EditUser;