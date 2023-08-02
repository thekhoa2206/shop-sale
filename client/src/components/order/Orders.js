import React, { useEffect, useState } from "react";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import ShowPaymentInfo from "../cards/ShowPaymentInfo";
import { styled } from '@mui/material/styles';
import  { tableCellClasses } from '@mui/material/TableCell';
import { withStyles } from "@material-ui/styles";
import { red } from "@material-ui/core/colors";
import { Link } from "react-router-dom";
import OrderStatus from "./OrderStatus";
import { getOrders } from "../../functions/admin";
import { useSelector } from "react-redux";
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
const StyledTableCell = styled(TableCell)(({ theme }) => ({
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
const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [openAdd, setOpenAdd] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [data, setData] = useState({});
  const [status, setStatus] = React.useState('');
  const { user } = useSelector((state) => ({ ...state }));
  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = () =>
    getOrders(user.token).then((res) => {
      setOrders(res.data);
    });

  const handleChangeEdit = (data) => {
    debugger
    setData(data);
    setOpenEdit(!openEdit);
  };
  const handleChangeEdit1 = () => {
    setOpenEdit(!openEdit);
  };
  const TableHeaderCell = withStyles(() => ({
    root: {
      fontSize: "14px",
      fontWeight: "bold",
      fontFamily:"sans-serif"
    },
  }))(TableCell);
  const TableHeaderCell1 = withStyles(() => ({
    root: {
      fontSize: "14px",
      fontWeight: "bold",
      fontFamily:"sans-serif"
    },
  }))(TableCell);
  function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    return (
      <React.Fragment>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
          <TableCell width={20}>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell width={150} >
            {row._id}
          </TableCell>
          <TableCell align="center" width={150}>{row.paymentIntent.amount}</TableCell>
          <TableCell align="center"width={150}>{row.paymentIntent.currency}</TableCell>
          <TableCell align="center"width={150}>{row.paymentIntent.payment_method_types[0]}</TableCell>
          <TableCell align="center"width={150}>{row.paymentIntent.status.toUpperCase()}</TableCell>
          <TableCell align="right"width={150}>{new Date(row.paymentIntent.created * 1000).toLocaleString()}</TableCell>
          <TableCell align="right"width={150}>
            <Link onClick={()=>handleChangeEdit(row)}> {row.orderStatus}
            </Link>
           
            </TableCell>
    
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  Detail
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableHeaderCell1>Title</TableHeaderCell1>
                      <TableHeaderCell1>Color</TableHeaderCell1>
                      <TableHeaderCell1 >Count</TableHeaderCell1>
                      <TableHeaderCell1 >Resident</TableHeaderCell1>
                      <TableHeaderCell1 >Price</TableHeaderCell1>
                      <TableHeaderCell1 >Shipping</TableHeaderCell1>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row.products.map((productRow) => (
                      <TableRow >
                        <TableCell component="th" scope="row">
                          {productRow.product.title}
                        </TableCell>
                        <TableCell >{productRow.color}</TableCell>
                        <TableCell>{productRow.count}</TableCell>
                        
                        <TableCell >{productRow.product.resident}</TableCell>
                        <TableCell >{productRow.product.price}</TableCell>
                        <TableCell >
                        {productRow.product.shipping}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }
  




  return (
    <>
    <TableContainer component={Paper} style={{boxShadow:"rgba(168, 168, 168, 0.25) 0px 0px 7px 3px"}} >
      <Table sx={{ minWidth: 700 }} >
        <TableHead style={{borderRadius:"6px solid #dfe4e8"}}>
          <TableRow >
          <TableHeaderCell ></TableHeaderCell>
            <TableHeaderCell >Id</TableHeaderCell>
            <TableHeaderCell   align="center">Amount</TableHeaderCell>
            <TableHeaderCell align="center">Currentcy</TableHeaderCell>
            <TableHeaderCell align="center">Method</TableHeaderCell>
            <TableHeaderCell align="center">Payment </TableHeaderCell>
            <TableHeaderCell align="right">Orderd on</TableHeaderCell>
            <TableHeaderCell align="center">Status</TableHeaderCell>
            </TableRow>
        </TableHead>
        <TableBody>
          {orders!==undefined? orders.map((row) => (
              <Row key={row._id} row={row} />
          )) : ""}
        </TableBody>
      </Table>
    </TableContainer>
    <OrderStatus
    open={openEdit}
    onClose={handleChangeEdit1}
    data={data}
    load={loadOrders}
    />
    </>
  );
};

export default Orders;
