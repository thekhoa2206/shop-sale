import React, { useState } from "react";
import { Card, Tabs, Tooltip } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import defaultIMG from "../../images/default.png";
import ProductListItems from "./ProductListItem";
import StarRating from "react-star-ratings";
import RatingModal from "../modal/RatingModal";
import { showAverage } from "../../functions/rating";
import _ from "lodash";
import { useSelector, useDispatch } from "react-redux";
import { addToWishlist } from "../../functions/user";
import { toast } from "react-toastify";
import { Box, Button, Typography } from "@material-ui/core";

const { Meta } = Card;
const { TabPane } = Tabs;
const SingleProduct = ({ product, onStarClick, star }) => {
    const [tooltip, setTooltip] = useState("Click to add");

    // redux
    const { user, cart } = useSelector((state) => ({ ...state }));
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { title, images, description, _id } = product;

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
            // show tooltip
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

    const handleAddToWishlist = (e) => {
        e.preventDefault();
        addToWishlist(product._id, user.token).then((res) => {
          console.log("ADDED TO WISHLIST", res.data);
          toast.success("Added to wishlist");
          navigate("/user/wishlist");
        });
      };
    return (
        <Box style={{width: 1300, display: "flex", margin: "auto"}}>
            <div style={{width: 620}}>
                <Box style={{background: "#FFFFFF", padding: 20, borderRadius: 6, boxShadow: "0px 2px 4px rgba(168, 168, 168, 0.25)"}}>
                    {images && images.length ? (
                        <Carousel showArrows={true} autoPlay infiniteLoop>
                            {images && images.map((i) => <img src={i.url} key={i.public_id} />)}
                        </Carousel>
                    ) : (
                        <Card cover={<img src={defaultIMG} className="mb-3 card-image" />}></Card>
                    )}
                </Box>

                    <Tabs type="card" style={{marginTop: 20}}>
                        <TabPane tab="Description" key="1">
                            <Box style={{background: "#FFFFFF", padding: 10, borderRadius: 6, marginTop: -15}}><Typography>{description && description}</Typography></Box>
                        </TabPane>
                        <TabPane tab="More" key="2">
                            Call use on xxxx xxx xxx to learn more about this product.
                        </TabPane>
                    </Tabs>
            </div>

            <div style={{width: 660, marginLeft: 20}}>
                <Box style={{background: "#FFFFFF", minHeight: "632px", padding: 20, borderRadius: 6, boxShadow: "0px 2px 4px rgba(168, 168, 168, 0.25)"}}>
                    <Typography style={{fontSize: 18, fontWeight: "bold", color: "#1c1c1b", marginBottom: 10}}>{title}</Typography>
                    <hr/>

                    <Typography style={{fontWeight: "bold", marginBottom: 10}}>
                        <span className="label label-default label-pill pull-xs-right">
                        $ {product.price}
                        </span>
                    </Typography>

                    {product && product.ratings && product.ratings.length > 0 ? (
                    showAverage(product)
                    ) : (
                        <div className="text-center pt-1 pb-3">No rating yet</div>
                    )}
                    <hr/>
                    <ProductListItems product={product} />
                    <Box style={{cursor: "pointer", textAlign: "center"}}>
                        <RatingModal>
                            <StarRating
                                name={_id}
                                numberOfStars={5}
                                rating={star}
                                changeRating={onStarClick}
                                isSelectable={true}
                                starRatedColor="#ffc84c"
                            />
                        </RatingModal>
                    </Box>
                    <hr/>
                    <Box style={{display: "flex", marginTop: "10px", marginLeft: 150}}>
                        <Tooltip title={tooltip}>
                            <Button 
                            startIcon={<ShoppingCartOutlined style={{color: "#FFFFFF", width: 16}}/>} 
                            onClick={handleAddToCart} 
                            style={{width: "160px", height: 40, borderRadius: 6, background: "#0088FF", color: "#FFFFFF", marginLeft: 20}}
                            >
                                 Add to Cart
                            </Button>
                            </Tooltip>
                            <Button 
                                startIcon={<HeartOutlined style={{color: "#FFFFFF", width: 16}}/>} 
                                onClick={handleAddToWishlist} 
                                style={{width: "180px", height: 40, borderRadius: 6, background: "#009688", color: "#FFFFFF", marginLeft: 20}}
                                >
                                    Add to Wishlist
                            </Button>
                    </Box>
                    
                </Box>
            </div>
            
        </Box>
    );
};

export default SingleProduct;
