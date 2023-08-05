import React, { useEffect, useState } from "react";
import SellerNav from "../../../components/nav/SellerNav";
import { getProductsByCountCurrentUser } from "../../../functions/product";
import AdminProductCard from "../../../components/cards/AdminProductCard";
import { removeProduct } from "../../../functions/product";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Box } from "@material-ui/core";

const AllSellerProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  // redux
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadAllProducts();
  }, []);

  const loadAllProducts = () => {
    setLoading(true);
    getProductsByCountCurrentUser(100, user.token)
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
    <Box style={{width: "100%", display: "flex", minHeight: 800}}>
        <Box style={{width: 230, minHeight: "100%"}}><SellerNav /></Box>
        <Box style={{marginTop: 20, marginLeft: 50,width: 1500}}>
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
        </Box>
      </Box>

  );
};

export default AllSellerProducts;
