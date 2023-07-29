import React, { useEffect, useState } from "react";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import ShowPaymentInfo from "../cards/ShowPaymentInfo";
import { Box, Collapse, FormControl, IconButton, InputLabel, MenuItem, Select, Table,TableCell, TableBody, TableContainer, TableHead, TableRow, Typography } from "@material-ui/core";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import  { tableCellClasses } from '@mui/material/TableCell';
import { withStyles } from "@material-ui/styles";
import { red } from "@material-ui/core/colors";
import { useParams } from "react-router-dom";
import { getOrders } from "../../functions/admin";
import { useSelector } from "react-redux";
import { isNull } from "lodash";
const StyledTableCell = styled(TableCell)(({ theme,props }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    fontFamily:"sans-serif"
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 40,
  },
}));
const OrderDetail = () => {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([isNull]);
  const [status, setStatus] = useState('');
  const { user } = useSelector((state) => ({ ...state }));
  const { id } = useParams();
  useEffect(() => {
    loadOrders();
  }, []);
  const loadOrders = () =>{
  getOrders(user.token).then((res) => {
    if(res.data.length > 0) {
     const data = res.data.filter(order => order._id===id);
     console.log("data",data);
     setOrders(data);
     setProducts(data.products);
   
    
    }
    
  })};


  const TableHeaderCell = withStyles(() => ({
    root: {
      fontSize: "14px",
      fontWeight: "bold",
      fontFamily:"sans-serif"
    },
  }))(TableCell);
  return (
    <>
    <Paper>
      <Box>
<Typography>
  {orders._id}
</Typography>
      </Box>
      <Box>
      <TableContainer component={Paper} style={{boxShadow:"rgba(168, 168, 168, 0.25) 0px 0px 7px 3px"}} >
      <Table sx={{ minWidth: 700 }} >
        <TableHead style={{borderRadius:"6px solid #dfe4e8"}}>
          <TableRow >
            <TableHeaderCell >Title</TableHeaderCell>
            <TableHeaderCell align="center">Color</TableHeaderCell>
            <TableHeaderCell align="center">Count</TableHeaderCell>
            <TableHeaderCell align="center">Resident </TableHeaderCell>
            <TableHeaderCell align="right">Price</TableHeaderCell>
            <TableHeaderCell align="center">Shipping</TableHeaderCell>
            </TableRow>
        </TableHead>
        <TableBody>
          {products !=null  ? products.map((row) => (
            <StyledTableRow key={row.product._id}>
              <StyledTableCell component="th" scope="row">
                {row.product._id}
              </StyledTableCell>
              <StyledTableCell align="center">{row.color}</StyledTableCell>
              <StyledTableCell align="center">{row.count}</StyledTableCell>
              <StyledTableCell align="center">{row.product.resident}</StyledTableCell>
              <StyledTableCell align="center">{row.product.price}</StyledTableCell>
              <StyledTableCell align="center">{row.product.shipping}</StyledTableCell>
            </StyledTableRow>
          )) : ""
          }
         
        </TableBody>
      </Table>
    </TableContainer>
      </Box>
    </Paper>

      {/* {orders.map((order) => (
        <div key={order._id} className="row pb-5">
          <div className="btn btn-block bg-light">
            <ShowPaymentInfo order={order} showStatus={false} />
<Box>ôkkoookko</Box>
            <div className="row">
              <div className="col-md-4">Delivery Status</div>
              <div className="col-md-8">
                <select
                  onChange={(e) =>
                    handleStatusChange(order._id, e.target.value)
                  }
                  className="form-control"
                  defaultValue={order.orderStatus}
                  name="status"
                >
                  <option value="Not Processed">Not Processed</option>
                  <option value="Cash On Delivery">Cash On Delivery</option>
                  <option value="Processing">Processing</option>
                  <option value="Dispatched">Dispatched</option>
                  <option value="Cancelled">Cancelled</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            </div>
          </div>

          {showOrderInTable(order)}
        </div>
      ))} */}
    </>
  );
};

export default OrderDetail;
