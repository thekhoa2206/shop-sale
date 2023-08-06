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
const initialState = {
    name: "",
    phoneNumber: "",
    email: "",
    role: ""

};

const EditUser = ({open,data, onClose}) => {
    const [role, setRole] = React.useState("");
    const [user, setUser] = React.useState(initialState);
    const handleSubmit = () => {
        console.log("chekkk", user);
    }
    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
        // console.log(e.target.name, " ----- ", e.target.value);
    };

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
                                    value={user.name != undefined ? user.name : data.name}
                                    onChange={(e) => handleChange(e)}
                                />
                            </Box>
                            <Box width={"100%"} marginLeft={5}>
                                <InputLabel style={{ color: "black", fontWeight: "500", fontSize: "16px" }}>PhoneNumber</InputLabel>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="phoneNumber"
                                    label="PhoneNumber"
                                    type="text"
                                    fullWidth
                                    variant="outlined"
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
                                />
                            </Box>
                            <Box width={"100%"} marginLeft={5} marginTop={1}>
                                <InputLabel style={{ color: "black", fontWeight: "500", fontSize: "16px" }}>Role</InputLabel>
                                <FormControl fullWidth >
                                    <InputLabel id="demo-simple-select-label" marginTop={2}>Role</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={role !== undefined ? role : data.role}
                                        label="Category"
                                        onChange={(e) => setRole(e.target.value)}
                                    >
                                        <MenuItem value={'Seller'}>
                                            Seller
                                        </MenuItem>
                                        <MenuItem value={'buyer '}>
                                            buyer
                                        </MenuItem>

                                    </Select>
                                </FormControl>
                            </Box>
                        </Box>
                    </Box>
                </DialogContent>
                <hr />
                <DialogActions>
                    <Button variant="contained" color="error" onClick={onClose}>
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