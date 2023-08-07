import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import ProductCardInCheckout from "../components/cards/ProductCartInCheckout";
import { updateUser, userCart } from "../functions/user";
import { Box, Button, Grid, Table, TableCell, TableHead, TextField } from "@material-ui/core";
import { Typography } from "antd";
import Footer from "../components/nav/Footer";
import { toast } from "react-toastify";

const UserInfo = () => {
  const { cart, user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userNew, setUserNew] = useState(user);
    useEffect(() => {
        if(user) setUserNew(user);
    }, [user])
    const handleChange = (e) => {
        setUserNew({ ...userNew, [e.target.name]: e.target.value });
        // console.log(e.target.name, " ----- ", e.target.value);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(password);
        updateUser(user.token, userNew)
          .then(() => {
            toast.success("User updated!");
          })
          .catch((err) => {
            toast.error(err.message);
          });
      };
  return (
    <div className="container-fluid pt-2" style={{marginTop: 50}}>
        <Box style={{ margin: "auto", width: 1000}}>
            <Box style={{margin: "auto", width: 1000, background: "#FFFFFF", padding: 20, borderRadius: 6, boxShadow: "0px 2px 4px rgba(168, 168, 168, 0.25)"}}>
                <Typography style={{fontWeight: "bold", fontSize: 16}}>User Information</Typography>
                <hr/>
                <Grid xs={12} container spacing={2}>
                    <Grid item xs={6}>
                        <Typography style={{marginBottom: 10}}>Name</Typography>
                        <TextField onChange={(e) => handleChange(e)} name="name" variant="outlined" placeholder="Input name" fullWidth value={userNew?.name}/>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography style={{marginBottom: 10}}>Email</Typography>
                        <TextField onChange={(e) => handleChange(e)} name="email" variant="outlined" placeholder="Input email" fullWidth value={userNew?.email}/>
                    </Grid>
                </Grid>
                <Grid xs={12} container spacing={2}>
                    <Grid item xs={6}>
                        <Typography style={{marginBottom: 10}}>Cart Detail</Typography>
                        <TextField onChange={(e) => handleChange(e)} name="cartDetail"  variant="outlined" placeholder="Input Cart Detail" fullWidth value={userNew?.cartDetail}/>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography style={{marginBottom: 10}}>Phone</Typography>
                        <TextField onChange={(e) => handleChange(e)} name="phoneNumber"  variant="outlined" placeholder="Input phone" fullWidth value={userNew?.phoneNumber}/>
                    </Grid>
                </Grid>

                <Grid xs={12} container spacing={2}>
                    <Grid item xs={6}>
                        <Typography style={{marginBottom: 10}}>Address</Typography>
                        <TextField onChange={(e) => handleChange(e)} name="address" variant="outlined" placeholder="Input address" fullWidth value={userNew?.address}/>
                    </Grid>
                </Grid>
                <Box style={{marginTop: 20}}>
                    <Button style={{background: "#0088FF", color: "#FFFFFF"}} onClick={handleSubmit}>Save</Button>
                </Box>
            </Box>
        </Box>
      <Box style={{position: "absolute", bottom: 0, zIndex: 100, width: "100%", left: 0}}>
        <Footer/>
      </Box>
    </div>
  );
};

export default UserInfo;
