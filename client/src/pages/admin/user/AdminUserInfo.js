import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { Box, Grid, IconButton, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@material-ui/core";
import { getUsers } from "../../../functions/user";
import EditIcon from '@mui/icons-material/Edit';
import { updateRole } from "../../../functions/admin";
import EditUser from "./EditUser";
const AdminUserInfo = () => {
  const [users, setUsers] = useState([]);
  const [role, setRole] = useState("");
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  // redux
  const { user } = useSelector((state) => ({ ...state }));
  useEffect(() => {
    initUsers();
  }, [])
  const initUsers = () => {
    getUsers(user.token).then((res) => {
      setUsers(res.data);
    })
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // console.log(password);

    updateRole(role)
      .then(() => {
        setLoading(false);
        toast.success("Password updated");
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err.message);
      });
  };


  return (
    <>
      <Box style={{ width: "100%", display: "flex", minHeight: "820px" }}>
        <Box style={{ width: 230, minHeight: "100%" }}><AdminNav /></Box>
        <Box style={{ marginTop: 20, marginLeft: 50, width: 1600 }}>
          <Box style={{ width: 1200, background: "#FFFFFF", padding: 20, borderRadius: 6, marginRight: 50, margin: "auto" }}>
            <Typography style={{ fontWeight: "bold", fontSize: 16 }}>User information</Typography>
            <hr />
            <Table stickyHeader>
              <TableHead >
                <TableCell><Typography style={{ fontWeight: "bold" }}>Index</Typography></TableCell>
                <TableCell><Typography style={{ fontWeight: "bold" }}>Name</Typography></TableCell>
                <TableCell><Typography style={{ fontWeight: "bold" }}>Email</Typography></TableCell>
                <TableCell><Typography style={{ fontWeight: "bold" }}>Phone Number</Typography></TableCell>
                <TableCell><Typography style={{ fontWeight: "bold" }}>Role</Typography></TableCell>
                <TableCell></TableCell>
              </TableHead>
              <TableBody>
                {users && users.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell onClick={()=>setData(item)}>
                      {item.name}
                      </TableCell>
                    
                    <TableCell>{item.email}</TableCell>
                    <TableCell>{item.phoneNumber}</TableCell>
                    <TableCell>{item.role}</TableCell>
                    <TableCell>
                      <IconButton >
                        <EditIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </Box>
        <EditUser
          open={open}
          data={data}
          onClose={() => {setOpen(false)}}
          />
      </Box>
     

    </>
  );
};
export default AdminUserInfo;

