import { Box, MenuItem, Button, MenuList } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { getCategories } from "../functions/category";
import MenuIcon from '@mui/icons-material/Menu';
import { Zoom } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'

import Slide1 from "../components/images/slide-show/slide-1.jpg";
import Slide2 from "../components/images/slide-show/slide-2.jpg";
import Slide3 from "../components/images/slide-show/slide-3.jpg";

const Banner = ({handleCategory}) => {
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        getCategories().then((res) => setCategories(res.data));
      }, []);

      const images = [Slide1,Slide2,Slide3];
    const Slideshow = () => {
        return (
          <Box className="slide-container" style={{height: 200, padding: "0px 20px"}}>
            <Zoom scale={0.4} arrows={false}>
              {
                images.map((each, index) => <img key={index} style={{width: "100%", height: 400}} src={each} />)
              }
            </Zoom>
          </Box>
        )
    }
  return (
    <Box style={{width: "98%", margin: "auto", display: "flex"}}>
      <Box style={{width: "10%", background: "while",  height: 400}}>
      {/* <Box style={{width: "15%", background: "while", border: "1px solid #E5E9EB", height: 400}}> */}
      {/* <Button startIcon={<MenuIcon /> }  style={{background: "#4094F7", color: "#FFFFFF", width: "100%", textAlign: "left"}}  onClick={(e) => {}}>Categories</Button>
        <MenuList style={{background: "#FFFFFF"}}>
          <MenuItem
            onClick={() => {
              handleCategory(undefined); 
              }}>
            All Category
          </MenuItem>
          {categories && categories.map((item, index) => (
          <MenuItem 
            key={index} 
            onClick={() => {
              handleCategory(item); 
              }}>
            {item.name}
          </MenuItem>))}
        </MenuList> */}
      </Box>
      <Box style={{width: "80%"}}>
              {Slideshow()}
      </Box>
    </Box>
  );
};

export default Banner;
