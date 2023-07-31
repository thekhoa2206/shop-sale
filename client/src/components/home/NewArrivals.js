import React, { useEffect, useState } from "react";
import { fetchProductsByFilter, getProducts, getProductsCount } from "../../functions/product";
import ProductCard from "../cards/ProductCard";
import LoadingCard from "../cards/LoadingCard";
import { Pagination } from "antd";
import { Box, Typography } from "@material-ui/core";
import NoData from "../images/NoData.png";

const NewArrivals = ({category}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [productsCount, setProductsCount] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if(!category) loadAllProducts();
  }, [page, category]);

  useEffect(() => {
    getProductsCount().then((res) => setProductsCount(res.data));
  }, []);

  const loadAllProducts = () => {
    setLoading(true);
    // sort, order, limit
    getProducts("createdAt", "desc", page).then((res) => {
      setProducts(res.data);
      setLoading(false);
    });
  };
  // useEffect(() => {
  //  if(category){
  //   let inTheState = [category._id];
  //   fetchProducts({category: inTheState})
  //  }
  // }, [category, page])
  // const fetchProducts = (arg) => {
  //   fetchProductsByFilter(arg).then((res) => {
  //     if(res.data){
  //       let data = [...res.data].splice((page-1) * 3, 3)
  //       setProducts(data);
  //       setProductsCount(res.data.length);
  //     }
  //   });
  // };
  return (
    <>
      <div className="container">
      <Typography style={{marginBottom: 30, fontWeight: "bold", fontSize: 26, lineHeight: "32px", marginTop: 20}}>
        New Arrivals
      </Typography>
        {loading ? (
          <LoadingCard count={3} />
        ) : (
          products && products.length > 0 ? <div className="row">
          {products.map((product) => (
            <div key={product._id} className="col-md-3">
              <ProductCard product={product} />
            </div>
          ))}
        </div> : <Box className="row" style={{textAlign: "center"}}>
            <img style={{width: 200, margin: "auto"}} src={NoData}/>
            <Typography>No Data</Typography>
        </Box>
        )}
      </div>

      <div className="row">
        <nav className="col-md-4 offset-md-4 text-center pt-5 p-3">
          <Pagination
            current={page}
            total={ Math.round((productsCount / 3) * 10)}
            onChange={(value) => setPage(value)}
          />
        </nav>
      </div>
    </>
  );
};

export default NewArrivals;
