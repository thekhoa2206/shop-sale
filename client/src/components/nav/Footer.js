import { Box, Button, Grid, Icon, Link, TextField, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import FacebookIcon from '../svg/FacebookIcon'
import InstagramIcon from '../svg/InstagramIcon'
import TwitterIcon from '../svg/TwitterIcon'
import { getCategories } from '../../functions/category'
import { toast } from 'react-toastify'
import { auth } from '../../firebase'

const Footer = () => {
  const [categories, setCategories] = useState([]);
  const [email, setEmail] = useState("");
    useEffect(() => {
        getCategories().then((res) => setCategories(res.data));
      }, []);
      const handleSubmit = async (e) => {
        if (!email) {
          toast.error(
            `Email is required.`
          );
          return;
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
          toast.error(
            `Invalid email address'.`
          );
          return;
        }
        e.preventDefault();
        // console.log("ENV --->", process.env.REACT_APP_REGISTER_REDIRECT_URL);
        const config = {
          url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
          handleCodeInApp: true,
        };
    
        await auth.sendSignInLinkToEmail(email, config);
        toast.success(
          `Email is sent to ${email}. Click the link to complete your registration.`
        );
        // save user email in local storage
        window.localStorage.setItem("emailForRegistration", email);
        // clear state
        setEmail("");
      };
    
  return (
    <Box style={{width: "100%", minHeight: 150, background: "#232f3e", marginTop: 30, color: "#FFFFFF"}}>
      <Box style={{width: "60%", margin: "auto", padding: 10}}>
        <Grid xs={12} container>
        {/* <Grid xs={4} item>
        <Typography style={{fontWeight: "bold", fontSize: 20}}>Categories</Typography>
        {categories && categories.length && categories.map((item, index) => (
        <Typography key={index} style={{textDecoration: "underline", cursor: "pointer"}} onClick={() => {window.location.href = `/category/${item.slug}`}}>
          {item.name}
          </Typography>
        ))}
        </Grid> */}
          <Grid xs={4} item> 
            <Typography style={{fontWeight: "bold", fontSize: 20}}>About us</Typography>
            <Typography style={{fontSize: 14}}>The store was opened in 2020 and has over 100,000 customers worldwide</Typography>
            <Typography style={{fontWeight: "bold", fontSize: 20}}>Connect with us</Typography>
            <Box style={{display: "flex"}}>
              <Box ><FacebookIcon /></Box>
              <Box style={{marginLeft: 10}}><InstagramIcon /></Box>
              <Box style={{marginLeft: 10}}><TwitterIcon/></Box>
            </Box>
          </Grid>
          <Grid xs={4} item> </Grid>
          <Grid xs={4} item> 
            <Typography style={{fontWeight: "bold", fontSize: 20}}>Contact</Typography>
            <Typography style={{fontSize: 14}}><span style={{fontWeight: "bold"}}>Address:</span> Vincom Tran Duy Hung, Tran Duy Hung street, Cau Giay district, Ha Noi </Typography>
            <Typography style={{fontSize: 14}}><span style={{fontWeight: "bold"}}>Email:</span> shopsale@gmail.com </Typography>
            <Typography style={{fontSize: 14}}><span style={{fontWeight: "bold"}}>Hotline:</span> 1234 2231</Typography>
            <Typography style={{fontWeight: "bold", fontSize: 20}}>Register</Typography>
            <Box style={{height: 40}}>
            <TextField placeholder='Input email register' value={email} variant='standard'
        onChange={(e) => setEmail(e.target.value)} autoFocus type="email" style={{background: "#FFFFFF", borderRadius: 6, padding: "0px 10px"}}/>
            <Button style={{height: 36, color: "#FFFFFF"}} onClick={(e) => {handleSubmit(e)}}>Register</Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}

export default Footer