import React, { useState, useEffect } from "react";
import { getOrders, changeStatus } from "../../functions/admin";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Orders from "../../components/order/Orders";
import SellerNav from "../../components/nav/SellerNav";
import { Box } from "@material-ui/core";

const SellerDashboard = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = () =>
    getOrders(user.token).then((res) => {
      console.log(JSON.stringify(res.data, null, 4));
      setOrders(res.data);
    });

//   const handleStatusChange = (orderId, orderStatus) => {
//     changeStatus(orderId, orderStatus, user.token).then((res) => {
//       toast.success("Status updated");
//       loadOrders();
//     });
//   };

  return (
    <Box style={{width: "100%", display: "flex", minHeight: 800}}>
        <Box style={{width: 230, minHeight: "100%"}}><SellerNav /></Box>
        <Box style={{marginTop: 20, marginLeft: 50,width: 1500}}>
          <h4>Seller Dashboard</h4>
          {/* {JSON.stringify(orders)} */}
          <Orders orders={orders}  />
        </Box>
      </Box>
  );
};

export default SellerDashboard;
