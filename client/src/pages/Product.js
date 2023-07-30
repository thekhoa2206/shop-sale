import React, { useEffect, useState } from "react";
import { getProduct, productStar } from "../functions/product";
import SingleProduct from "../components/cards/SingleProduct";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getRelated } from "../functions/product";
import ProductCard from "../components/cards/ProductCard";
import { Box, Typography } from "@material-ui/core";

const Product = ({ match }) => {
  const [product, setProduct] = useState({});
  const [related, setRelated] = useState([]);
  const [star, setStar] = useState(0);

  const { user } = useSelector((state) => ({ ...state }));

  const { slug } = useParams();

  useEffect(() => {
    loadSingleProduct();
  }, [slug]);

  useEffect(() => {
    if (product.ratings && user) {
      let existingRatingObject = product.ratings.find(
        (ele) => ele.postedBy.toString() === user._id.toString()
      );
      existingRatingObject && setStar(existingRatingObject.star); // current user's star
    }
  }, [product.ratings, user]);

  const loadSingleProduct = () => {
    getProduct(slug).then((res) => {
      setProduct(res.data);
      // load related
      getRelated(res.data._id).then((res) => setRelated(res.data));
    });
  };

  const onStarClick = (newRating, name) => {
    setStar(newRating);
    // console.table(newRating, name);
    productStar(name, star, user.token).then((res) => {
      console.log("rating clicked", res.data);
      loadSingleProduct(); // if you want to show updated rating in real time
    });
  };

  return (
    <div className="container-fluid">
      <div className="row pt-4">
        <SingleProduct
          product={product}
          onStarClick={onStarClick}
          star={star} />
      </div>


      <div className="row pb-5">
        <Box style={{width: "1400px", margin: "auto", marginTop: 20 }}>
          <Typography style={{marginBottom: 30, fontWeight: "bold", fontSize: 26, lineHeight: "32px", marginLeft: 20}}>
            Our Popular Products
          </Typography>
        </Box>
        <Box style={{width: "1400px", display: "flex", margin: "auto"}}>
          {related.length ? (
            related.map((r) => (
              <div key={r._id} className="col-md-3">
                <ProductCard product={r} />
              </div>
            ))
          ) : (
            <div className="text-center col">No Products Found</div>
          )}
        </Box>
      </div>
    </div>
  );
};

export default Product;
