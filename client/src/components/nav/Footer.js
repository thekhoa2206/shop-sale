import { Box, Grid, Icon, Link, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import FacebookIcon from '../svg/FacebookIcon'
import InstagramIcon from '../svg/InstagramIcon'
import TwitterIcon from '../svg/TwitterIcon'
import { getCategories } from '../../functions/category'

const Footer = () => {
  const [categories, setCategories] = useState([]);
    useEffect(() => {
        getCategories().then((res) => setCategories(res.data));
      }, []);

  return (
    <Box style={{width: "100%", minHeight: 150, background: "#e9e9e9", marginTop: 30}}>
      <Box style={{width: "60%", margin: "auto", padding: 10}}>
        <Grid xs={12} container>
        <Grid xs={4} item>
        <Typography style={{fontWeight: "bold", fontSize: 20}}>Categories</Typography>
        {categories && categories.length && categories.map((item, index) => (
        <Typography key={index} style={{textDecoration: "underline", cursor: "pointer"}} onClick={() => {window.location.href = `/category/${item.slug}`}}>
          {item.name}
          </Typography>
        ))}
        </Grid>
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
          <Grid xs={4} item> 
            <Typography style={{fontWeight: "bold", fontSize: 20}}>Contact</Typography>
            <Typography style={{fontSize: 14}}><span style={{fontWeight: "bold"}}>Address:</span> Vincom Tran Duy Hung, Tran Duy Hung street, Cau Giay district, Ha Noi </Typography>
            <Typography style={{fontSize: 14}}><span style={{fontWeight: "bold"}}>Email:</span> shopsale@gmail.com </Typography>
            <Typography style={{fontSize: 14}}><span style={{fontWeight: "bold"}}>Hotline:</span> 1234 2231</Typography>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}

export default Footer