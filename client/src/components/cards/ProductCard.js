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

const { Meta } = Card;

const ProductCard = ({ product }) => {
  const [tooltip, setTooltip] = useState("Click to add");
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
      <Box style={{border: "1px solid #E5E9EB", borderRadius: 6, width: 400}}>
        <Box>
          <img
              src={images && images.length ? images[0].url : defaultIMG}
              style={{ height: "300px", objectFit: "cover", width: "100%" }}
              className="p-1"
            />
        </Box>
        <Box style={{textAlign: "center", position: "absolute", zIndex: 100, top: 5, left: "370px", display: "inline-block"}}>
          <Box style={{width: 30, textAlign: "center"}}>
            <IconButton style={{width: 20, height: 30}}>
              <Link to={`/product/${slug}`} target="_blank">
                <EyeOutlined style={{color: "#757575", width: 20}} />
              </Link>
            </IconButton>

            <IconButton style={{width: 20, height: 30}} onClick={handleAddToCart} disabled={product.quantity < 1}>
          <Tooltip title={tooltip}>
              <ShoppingCartOutlined style={{color: "#757575"}} />
          </Tooltip>
            </IconButton>
            
            {user && (
            <IconButton style={{width: 20, height: 30}}>
              <Checkbox checked={!!wishlist.find((item) => item._id === product._id)}  icon={<FavoriteBorder />} checkedIcon={<Favorite />} onChange={(e) => handleAddToWishlist(e)}/>
            </IconButton>
            )}
          </Box>
        </Box>
        <Box style={{padding: "10px 20px"}}>
          <Typography>{title}</Typography>
          <Typography>{`${description && description.substring(0, 40)}...`}</Typography>
          <Typography style={{fontWeight: "bold", fontSize: 20}}>${product.price}</Typography>
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
        </Box>
      </Box>
      
    </>
  );
};

export default ProductCard;
