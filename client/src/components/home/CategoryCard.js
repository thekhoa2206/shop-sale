import { Box, Grid, Typography } from "@material-ui/core";
import { Card } from "antd";
import React, { useEffect, useState } from "react";
import '../css/ProductCard.css';
import { getCategories } from "../../functions/category";
import Category from "../images/laptop.jpg"
import { fetchProductsByFilter } from "../../functions/product";
const { Meta } = Card;

const CategoryCard = ({handleCategory}) => {
  const [categories, setCategories] = useState([]);
    useEffect(() => {
        getCategories().then((res) => {
          let categories = []
          if(res.data){
            res.data.map((item) => {
              let category = {
                ...item,
                count: 3,
              }
              categories.push(category);
            })
          }
          setCategories(categories);
        });
      }, []);
      
  return (
    <>
      <Box className="container" style={{background: "#FFFFFF", padding: 15, boxShadow: "0 0 10px #0000001a", marginTop: 20, borderRadius: 6}}>
        <Grid xs={12} container className="border-card-container">
          {categories && categories.map((item, index) => (
            <Grid xs={3} item key={index} className="border-card" onClick={() => {window.location.href = `/category/${item.slug}`}} style={{cursor: "pointer"}}>
            <Box style={{padding: 10, width: "100%"}}>
              <Box style={{width: 110, height: 110, margin: "auto"}}>
                <img style={{width: 110, height: 110}} src={Category} alt="camera" />
              </Box>
              <Box style={{width: "100%", textAlign: "center"}}>
                <Typography style={{fontWeight: "bold", lineHeight: "1.2"}} >{item.name}</Typography>
                <Typography style={{fontSize: 14}}>{`${item.count} products`}</Typography>
              </Box>
            </Box>
          </Grid>
          ))}
        </Grid>
      </Box>
      
    </>
  );
};

export default CategoryCard;
