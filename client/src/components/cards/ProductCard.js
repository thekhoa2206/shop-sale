import React, { useEffect, useMemo, useState } from "react";
import { Card, Tooltip } from "antd";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import defaultIMG from "../../images/default.png";
import { Link } from "react-router-dom";
import { showAverage } from "../../functions/rating";
import _ from "lodash";
import { useSelector, useDispatch } from "react-redux";
import { Box, Checkbox, IconButton, Typography } from "@material-ui/core";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import StarRating from "react-star-ratings";
import { addToWishlist, getWishlist, removeWishlist } from "../../functions/user";
import { toast } from "react-toastify";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import EyeIcon from "../svg/EyeIcon";
import '../css/ProductCard.css';

const { Meta } = Card;

const ProductCard = ({ product }) => {
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
      <Box onClick={() => {window.open(`/product/${slug}`)}} className={"product-card"} style={{background: "#FFFFFF", borderRadius: 10, width: "100%", padding: 10, height: 440, cursor: "pointer", boxShadow: "0px 2px 4px rgba(168, 168, 168, 0.25)"}}>
        <Box>
          <img
              src={images && images.length ? images[0].url : defaultIMG}
              style={{ height: "300px", objectFit: "cover", width: "100%" }}
              className="p-1"
            />
        </Box>
        <Box style={{textAlign: "center", position: "absolute", zIndex: 100, top: 5, left: "85%", display: "inline-block"}} >
          <Box style={{width: 30, textAlign: "center"}} className="icon-show action-bar">
          {user && (
            <IconButton style={{width: 20, height: 30}}>
              <Checkbox checked={!!wishlist.find((item) => item._id === product._id)}  icon={<FavoriteBorder style={{color: "#1c1c1b", width: 16}} />} checkedIcon={<Favorite style={{ width: 16}} />} onChange={(e) => handleAddToWishlist(e)}/>
            </IconButton>
            )}
            <IconButton style={{width: 20, height: 30}}>
              <Link to={`/product/${slug}`} target="_blank">
                <EyeIcon style={{color: "#1c1c1b", width: 16}} />
              </Link>
            </IconButton>

            <IconButton style={{width: 20, height: 30}} onClick={handleAddToCart} disabled={product.quantity < 1}>
          <Tooltip title={tooltip}>
              <ShoppingCartOutlinedIcon style={{color: "#1c1c1b", width: 16}} />
          </Tooltip>
            </IconButton>
          </Box>
        </Box>
        <Box style={{padding: "0px 10px"}}>
          <Typography style={{color: "#bf4800", fontSize: 13, fontWeight: "bold"}}>{title}</Typography>
          <Box style={{height: 45}}><Typography style={{color: "#1c1c1b", fontSize: 15, fontWeight: "bold"}}>{`${description && description.substring(0, 40)}...`}</Typography></Box>
          <Box style={{display: "flex"}}>
            <StarRating
              changeRating={() => {}}
              starHoverColor="#CBD3E3"
              numberOfStars={5}
              rating={avgRating}
              starDimension="16px"
              starSpacing="2px"
              starRatedColor="#ffc84c"
            />
            <Typography style={{color: "#5B6871", marginTop: 4, marginLeft: 5, fontSize: 14}}>{product.ratings.length}</Typography>
          </Box>
          <Typography style={{fontWeight: "bold", fontSize: 20}}>${product.price}</Typography>
        </Box>
      </Box>
      
    </>
  );
};

export default ProductCard;
