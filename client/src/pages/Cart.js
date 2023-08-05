import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import ProductCardInCheckout from "../components/cards/ProductCartInCheckout";
import { userCart } from "../functions/user";
import { Box, Button, Table, TableCell, TableHead } from "@material-ui/core";
import { Typography } from "antd";

const Cart = () => {
  const { cart, user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getTotal = () => {
    return cart.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0);
  };

  const saveOrderToDb = () => {
    // console.log("cart", JSON.stringify(cart, null, 4));
    userCart(cart, user.token)
      .then((res) => {
        console.log("CART POST RES", res);
        if (res.data.ok) navigate("/checkout");
      })
      .catch((err) => console.log("cart save err", err));
  };

  const saveCashOrderToDb = () => {
    // console.log("cart", JSON.stringify(cart, null, 4));
    dispatch({
      type: "COD",
      payload: true,
    });
    userCart(cart, user.token)
      .then((res) => {
        console.log("CART POST RES", res);
        if (res.data.ok) navigate("/checkout");
      })
      .catch((err) => console.log("cart save err", err));
  };

  const showCartItems = () => (
    <Table>
      <TableHead >
        <TableCell>Image</TableCell>
        <TableCell>Title</TableCell>
        <TableCell>Price</TableCell>
        <TableCell>Resident</TableCell>
        <TableCell>Color</TableCell>
        <TableCell>Count</TableCell>
        <TableCell>Shipping</TableCell>
        <TableCell>Remove</TableCell>
      </TableHead>

      {cart.map((p) => (
        <ProductCardInCheckout key={p._id} p={p} />
      ))}
    </Table>
  );
  return (
    <div className="container-fluid pt-2" style={{marginTop: 50}}>
      <Box style={{display: "flex",  margin: "auto", width: 1600}}>
      <Box style={{width: 1000, background: "#FFFFFF", padding: 20, borderRadius: 6, marginRight: 50, boxShadow: "0px 2px 4px rgba(168, 168, 168, 0.25)"}}>
      <Typography style={{fontWeight: "bold", fontSize: 16}}>Cart / {cart.length} Product</Typography>
      <hr/>
        <Box>
        {!cart.length ? (
          <p>
            No products in cart. <Link to="/shop">Continue Shopping.</Link>
          </p>
        ) : (
          showCartItems()
        )}
        </Box>
        
      </Box>

      <Box style={{width: 500, background: "#FFFFFF", padding: 20, borderRadius: 6, boxShadow: "0px 2px 4px rgba(168, 168, 168, 0.25)"}}>
        <Box>
        <Typography style={{fontWeight: "bold", fontSize: 16}}>Order Summary</Typography>
            <hr />
            <Box style={{marginLeft: 0}}>
              <Typography style={{fontWeight: "bold", fontSize: 14}}>Products</Typography>
              {cart.map((c, i) => (
                <div key={i}>
                  <Typography>
                    {c.title} x {c.count} = ${c.price * c.count}
                  </Typography>
                </div>
              ))}
            </Box>
            <Box style={{marginLeft: 0}}>
              <hr />
              Total: <b>${getTotal()}</b>
              <hr />
            </Box>
          </Box>

      <Box style={{marginBottom: 50, marginTop: 20}}>
        {user ? (
              <Box style={{display: "flex"}}>
              <Button
                onClick={saveOrderToDb}
                disabled={!cart.length}
                style={{height: 40, borderRadius: 6, background: "#009688", color: "#FFFFFF"}}
              >
                Proceed to Checkout
              </Button>
              <Button
                onClick={saveCashOrderToDb}
                disabled={!cart.length}
                style={{height: 40, borderRadius: 6, background: "#0088FF", color: "#FFFFFF", marginLeft: 20}}
              >
                Pay Cash on Delivery
              </Button>
            </Box>
            ) : (
              <Button style={{height: 40, borderRadius: 6, background: "#0088FF", color: "#FFFFFF", marginLeft: 20}}>
                <Link
                  to={{
                    pathname: "/login",
                    state: { from: "cart" },
                  }}
                  style={{color: "#FFFFFF"}}
                >
                  Login to Checkout
                </Link>
              </Button>
            )}
      </Box>
      </Box>
      </Box>
    </div>
  );
};

export default Cart;
