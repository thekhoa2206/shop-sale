import React, { useState } from "react";
import UserNav from "../../components/nav/UserNav";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import TextField from '@mui/material/TextField';
import { Box, Button, FormControl, Select } from "@mui/material";

const Password = () => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // console.log(password);

    await auth.currentUser
      .updatePassword(password)
      .then(() => {
        setLoading(false);
        setPassword("");
        toast.success("Password updated");
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err.message);
      });
  };

  const passwordUpdateForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Your Password</label>
        <TextField
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          className="form-control"
          placeholder="Enter new password"
          disabled={loading}
          value={password}
        />
        <Button
          variant="contained"
          color="primary"
          disabled={!password || password.length < 6 || loading}
          style={{marginTop:12}}
        >
          Submit
        </Button>
      </div>
    </form>
  );


  return (
    <Box style={{width: "100%", display: "flex", minHeight: 800}}>
        <Box style={{width: 230, minHeight: "100%"}}><UserNav /></Box>
        <Box style={{width: 600, marginTop: 30, marginLeft: 500, background: "#FFFFFF", padding: 20, height: 200 }}>
        {loading ? (
            <h4 className="text-danger">Loading..</h4>
          ) : (
            <Box>
            <h4>Password Update</h4>
            <hr/>
            </Box>
          )}
          {passwordUpdateForm()}
        </Box>
      </Box>
  );
};

export default Password;
