import React, { useEffect, useState } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { getProductsByCount } from "../../../functions/product";
import AdminProductCard from "../../../components/cards/AdminProductCard";
import { removeProduct } from "../../../functions/product";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Grid from '@mui/material/Unstable_Grid2';
import { Box, Button, Typography } from "@mui/material";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  // redux
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadAllProducts();
  }, []);

  const loadAllProducts = () => {
    setLoading(true);
    getProductsByCount(100)
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  const handleRemove = (slug) => {
    // let answer = window.confirm("Delete?");
    if (window.confirm("Delete?")) {
      // console.log("send delete request", slug);
      removeProduct(slug, user.token)
        .then((res) => {
          loadAllProducts();
          toast.error(`${res.data.title} is deleted`);
        })
        .catch((err) => {
          if (err.response.status === 400) toast.error(err.response.data);
          console.log(err);
        });
    }
  };

  return (
    <>
    {/* <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>

        <div className="col">
          {loading ? (
            <h4 className="text-danger">Loading...</h4>
          ) : (
            <h4>All Products</h4>
          )}
          <div className="row">
            {products.map((product) => (
              <div key={product._id} className="col-md-4 pb-3">
                <AdminProductCard
                  product={product}
                  handleRemove={handleRemove}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div> */}

        <Box style={{width: "100%", display: "flex", minHeight: "820px"}}>
        <Box style={{width: 230, minHeight: "100%"}}><AdminNav /></Box>
        <Box style={{marginTop: 20, marginLeft: 50, width: 1600}}>
          <Typography variant="h5" marginLeft={0} marginBottom={"10px"}>All Products({products.length})</Typography>

              <div className="row">
              {products.map((product) => (
                <div key={product._id} className="col-md-4 pb-3">
                   <AdminProductCard
                  product={product}
                  handleRemove={handleRemove}
                />
                </div>
              ))}
            </div>

        </Box>
      </Box>
    </>
  );
};

export default AllProducts;
