import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import {
  getUserCart,
  emptyUserCart,
  saveUserAddress,
  applyCoupon,
  createCashOrderForUser,
} from "../functions/user";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Box, Grid, Paper, TextField, Typography } from "@material-ui/core";
import { Button } from "antd";

const Checkout = ({ }) => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [address, setAddress] = useState("");
  const [addressSaved, setAddressSaved] = useState(false);
  const [coupon, setCoupon] = useState("");
  // discount price
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);
  const [discountError, setDiscountError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, COD } = useSelector((state) => ({ ...state }));
  const couponTrueOrFalse = useSelector((state) => state.coupon);

  useEffect(() => {
    getUserCart(user.token).then((res) => {
      console.log("user cart res", JSON.stringify(res.data, null, 4));
      setProducts(res.data.products);
      setTotal(res.data.cartTotal);
    });
  }, []);

  const emptyCart = () => {
    // remove from local storage
    if (typeof window !== "undefined") {
      localStorage.removeItem("cart");
    }
    // remove from redux
    dispatch({
      type: "ADD_TO_CART",
      payload: [],
    });
    // remove from backend
    emptyUserCart(user.token).then((res) => {
      setProducts([]);
      setTotal(0);
      setTotalAfterDiscount(0);
      setCoupon("");
      toast.success("Cart is emapty. Contniue shopping.");
    });
  };

  const saveAddressToDb = () => {
    // console.log(address);
    saveUserAddress(user.token, address).then((res) => {
      if (res.data.ok) {
        setAddressSaved(true);
        toast.success("Address saved");
      }
    });
  };

  const applyDiscountCoupon = () => {
    console.log("send coupon to backend", coupon);
    applyCoupon(user.token, coupon).then((res) => {
      console.log("RES ON COUPON APPLIED", res.data);
      if (res.data) {
        setTotalAfterDiscount(res.data);
        // update redux coupon applied true/false
        dispatch({
          type: "COUPON_APPLIED",
          payload: true,
        });
      }
      // error
      if (res.data.err) {
        setDiscountError(res.data.err);
        // update redux coupon applied true/false
        dispatch({
          type: "COUPON_APPLIED",
          payload: false,
        });
      }
    });
  };

  const showAddress = () => (
    <>
      <ReactQuill theme="snow" value={address} onChange={setAddress} />
      <Button className="btn btn-primary mt-2" onClick={saveAddressToDb} style={{background: "#0088FF", color: "#FFFFFF", height: 36}}>
        Save
      </Button>
    </>
  );

  const showProductSummary = () =>
    products.map((p, i) => (
      <div key={i}>
        <p>
          {p.product.title} ({p.color}) x {p.count} ={" "}
          {p.product.price * p.count} $
        </p>
      </div>
    ));

  const showApplyCoupon = () => (
    <>
      <TextField
        onChange={(e) => {
          setCoupon(e.target.value);
          setDiscountError("");
        }}
        value={coupon}
        type="text"
        fullWidth
        variant="standard"
        placeholder="Input Coupon"
        style={{marginBottom: 20}}
      />
      <Button onClick={applyDiscountCoupon} className="btn btn-primary mt-2" style={{background: "#0088FF", color: "#FFFFFF", height: 36}}>
        Apply
      </Button>
    </>
  );

  const createCashOrder = () => {
    createCashOrderForUser(user.token, COD, couponTrueOrFalse).then((res) => {
      console.log("USER CASH ORDER CREATED RES ", res);
      // empty cart form redux, local Storage, reset coupon, reset COD, redirect
      if (res.data.ok) {
        // empty local storage
        if (typeof window !== "undefined") localStorage.removeItem("cart");
        // empty redux cart
        dispatch({
          type: "ADD_TO_CART",
          payload: [],
        });
        // empty redux coupon
        dispatch({
          type: "COUPON_APPLIED",
          payload: false,
        });
        // empty redux COD
        dispatch({
          type: "COD",
          payload: false,
        });
        // mepty cart from backend
        emptyUserCart(user.token);
        // redirect
        setTimeout(() => {
          navigate("/user/history");
        }, 1000);
      }
    });
  };

  return (
    <Box style={{width: "90%", margin: "auto", marginTop: 25}}>
      <Grid xs={12} container  spacing={2} style={{padding: "20px"}}>
      <Grid xs={6} item>
        <Paper  style={{width: "100%", boxShadow: "0px 2px 4px rgba(168, 168, 168, 0.25)", padding: 10}}>
          <Typography style={{fontWeight: "bold", fontSize: 16, padding: "12px 24px 16px"}}>Additional information</Typography>
          <Box style={{height: 1,background: "#dbdbdb"}}></Box>
        <Box style={{width: "90%", margin: "auto", marginTop: 10}}>
        <Typography variant="h6" style={{marginBottom: "5px"}}>Delivery address</Typography>
        {showAddress()}
        <Typography variant="h6" style={{marginBottom: "10px"}}>Got Coupon?</Typography>
        {showApplyCoupon()}
        <br />
        {discountError && <p className="bg-danger p-2">{discountError}</p>}
        </Box>
        </Paper>
        
      </Grid>
      <Grid xs={6} item>
      <Paper style={{width: "100%", boxShadow: "0px 2px 4px rgba(168, 168, 168, 0.25)", padding: 10}}>
          <Typography style={{fontWeight: "bold", fontSize: 16, padding: "12px 24px 16px"}}>Order Summary</Typography>
          <Box style={{height: 1,background: "#dbdbdb"}}></Box>
      <Box style={{width: "90%", margin: "auto", marginTop: 10}}>
      <p>Number Products: <span style={{fontWeight: "bold"}}>{products.length}</span></p>
        <hr />
        {showProductSummary()}
        <hr />
        <Typography style={{fontWeight: "bold", marginBottom: 20}}>Cart Total: {total} $</Typography>

        {totalAfterDiscount > 0 && (
          <p className="bg-success p-2">
            Discount Applied: Total Payable: ${totalAfterDiscount}
          </p>
        )}
      </Box>
        </Paper>
      </Grid>
      </Grid>
      <Box style={{display: "flex", marginLeft: 1400}}>
          <Box>
            {COD ? (
              <Button
                disabled={!products.length}
                onClick={createCashOrder}
                style={{height: 40, borderRadius: 6, background: "#0088FF", color: "#FFFFFF", marginLeft: 20}}
              >
                Place Order
              </Button>
            ) : (
              <Button
                disabled={!addressSaved || !products.length}
                onClick={() => navigate("/payment")}
                style={{height: 40, borderRadius: 6, background: "#0088FF", color: "#FFFFFF", marginLeft: 20}}
              >
                Place Order
              </Button>
            )}
          </Box>

          <Box style={{marginLeft: 20}}>
            <Button
              disabled={!products.length}
              onClick={emptyCart}
              style={{height: 40, borderRadius: 6, background: "#009688", color: "#FFFFFF"}}
            >
              Empty Cart
            </Button>
          </Box>
        </Box>
    </Box>
  );
};

export default Checkout;
