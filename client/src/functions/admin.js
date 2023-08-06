import axios from "axios";

export const getOrders = async (authtoken) =>
  await axios.get(`${process.env.REACT_APP_API}/admin/orders`, {
    headers: {
      authtoken,
    },
  });

export const changeStatus = async (orderId, orderStatus, authtoken) =>
  await axios.put(
    `${process.env.REACT_APP_API}/admin/order-status`,
    { orderId, orderStatus },
    {
      headers: {
        authtoken,
      },
    }
  );


  export const updateRole = async (userRole, userId,authtoken) =>
  await axios.put(
    `${process.env.REACT_APP_API}/admin/update-user`,
    { userRole,userId },
    {
      headers: {
        authtoken,
      },
    }
  );