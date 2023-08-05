import React, { useEffect, useMemo, useState } from "react";
import { Card, Tooltip } from "antd";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import defaultIMG from "../../images/default.png";
import { Link } from "react-router-dom";
import { showAverage } from "../../functions/rating";
import _ from "lodash";
import { useSelector, useDispatch } from "react-redux";
import { Box, Checkbox, Grid, IconButton, Typography } from "@material-ui/core";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import StarRating from "react-star-ratings";
import { addToWishlist, getWishlist, removeWishlist } from "../../functions/user";
import { toast } from "react-toastify";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
const { Meta } = Card;

const ProductCardV2 = ({ product }) => {
  const [tooltip, setTooltip] = useState(product.quantity > 0 ? "Click to add" : "Out of stock");
  const [wishlist, setWishlist] = useState([]);
  // redux
  const { user, cart } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  const handleAddToCart = () => {
    // create cart array
    let cart = [];
    if (typeof window !== "undefined") {
      // if cart is in local storage GET it
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      // push new product to cart
      cart.push({
        ...product,
        count: 1,
      });
      // remove duplicates
      let unique = _.uniqWith(cart, _.isEqual);
      // save to local storage
      // console.log('unique', unique)
      localStorage.setItem("cart", JSON.stringify(unique));
      setTooltip("Added");

      // add to reeux state
      dispatch({
        type: "ADD_TO_CART",
        payload: unique,
      });
      // show cart items in side drawer
      dispatch({
        type: "SET_VISIBLE",
        payload: true,
      });
    }
  };
  // destructure
  const { images, title, description, slug } = product;
  const avgRating = useMemo(() => {
    let avgRate = 0;
    if(product){
      if(product.ratings && product.ratings.length > 0){
          let total = 0;
          product.ratings.filter((item) => {
            total += item.star;
          })
          avgRate = total/product.ratings.length;
      }
    }
    return avgRate;
  }, [product])


  const handleAddToWishlist = (e) => {
    if(!wishlist.find((item) => item._id === product._id)){
      e.preventDefault();
      addToWishlist(product._id, user.token).then((res) => {
      console.log("ADDED TO WISHLIST", res.data);
      toast.success("Added to wishlist");
      loadWishlist();
    });
    }else {
      handleRemove(product._id)
    }
  };
  useEffect(() => {
    if(user?.token) loadWishlist();
  }, [user])
  const loadWishlist = () =>
    getWishlist(user.token).then((res) => {
      // console.log(res);
      setWishlist(res.data.wishlist);
    });

  const handleRemove = (productId) =>
    removeWishlist(productId, user.token).then((res) => {
      loadWishlist();
    });
  return (
    <>
      <Box  onClick={() => {window.open(`/product/${slug}`)}} style={{cursor: "pointer", background: "#FFFFFF", padding: 20, borderRadius: 6, width: 1300, marginTop: 20, height: 240, alignItems: "center", boxShadow: "0px 2px 4px rgba(168, 168, 168, 0.25)"}}>
        <Grid xs={12} container>
            <Grid xs={3} item> 
            <Box>
          <img
              src={images && images.length ? images[0].url : defaultIMG}
              style={{ objectFit: "cover", width: "200px", height: "200px"  }}
              className="p-1"
            />
        </Box>
            </Grid>
            <Grid xs={8} item> 
            <Typography style={{color: "#ed5555"}}>{title}</Typography>
          <Typography>{`${description && description}`}</Typography>
          <Box style={{display: "flex"}}>
            <StarRating
              changeRating={() => {}}
              starHoverColor="#CBD3E3"
              numberOfStars={5}
              rating={avgRating}
              starDimension="20px"
              starSpacing="2px"
              starRatedColor="red"
            />
            <Typography style={{color: "#5B6871", marginTop: 4, marginLeft: 5, fontSize: 14}}>{product.ratings.length}</Typography>
          </Box>
          <Typography style={{fontWeight: "bold", fontSize: 20}}>${product.price}</Typography>
            </Grid>
            <Grid xs={1} item style={{textAlign: "right"}}> 
            <Box style={{textAlign: "center",  display: "inline-block"}}>
          <Box style={{width: 30, textAlign: "center"}}>
            <IconButton style={{width: 20, height: 30}}>
              <Link to={`/product/${slug}`} target="_blank">
                <RemoveRedEyeOutlinedIcon style={{color: "#1c1c1b", width: 16}} />
              </Link>
            </IconButton>

            <IconButton style={{width: 20, height: 30}} onClick={handleAddToCart} disabled={product.quantity < 1}>
          <Tooltip title={tooltip}>
              <ShoppingCartOutlinedIcon style={{color: "#1c1c1b", width: 16}} />
          </Tooltip>
            </IconButton>
            
            {user && (
            <IconButton style={{width: 20, height: 30}}>
              <Checkbox checked={!!wishlist.find((item) => item._id === product._id)}  icon={<FavoriteBorder style={{color: "#1c1c1b", width: 16}}/>} checkedIcon={<Favorite style={{ width: 16}}/>} onChange={(e) => handleAddToWishlist(e)}/>
            </IconButton>
            )}
          </Box>
        </Box>
            </Grid>
        </Grid>
        
      </Box>
      
    </>
  );
};

export default ProductCardV2;
