import React from "react";
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
const OrderDetail = ({ orders }) => {
  const { classes } = props;
  const [status, setStatus] = React.useState('');
  console.log("status",status);
  const handleChange = (id,e) => {
    setStatus(e.target.value)
    handleStatusChange(id,e.target.value)
  };

  // function Row(props) {
  //   const { row } = props;
  //   const [open, setOpen] = React.useState(false);
  //   setStatus(row.orderStatus);
  //   return (
  //     <React.Fragment>
  //       <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
  //         <TableCell width={20}>
  //           <IconButton
  //             aria-label="expand row"
  //             size="small"
  //             onClick={() => setOpen(!open)}
  //           >
  //             {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
  //           </IconButton>
  //         </TableCell>
  //         <TableCell width={150} >
  //           {row._id}
  //         </TableCell>
  //         <TableCell align="center" width={150}>{row.paymentIntent.amount}</TableCell>
  //         <TableCell align="center"width={150}>{row.paymentIntent.currency}</TableCell>
  //         <TableCell align="center"width={150}>{row.paymentIntent.payment_method_types[0]}</TableCell>
  //         <TableCell align="center"width={150}>{row.paymentIntent.status.toUpperCase()}</TableCell>
  //         <TableCell align="right"width={150}>{new Date(row.paymentIntent.created * 1000).toLocaleString()}</TableCell>
  //         <FormControl fullWidth>
  //       <InputLabel id="demo-simple-select-label">Age</InputLabel>
  //       <Select
  //         labelId="demo-simple-select-label"
  //         id="demo-simple-select"
  //         value={status}
  //         onChange={(e)=>handleChange(row._id,e)}
  //       >
  //         <MenuItem value="Not Processed">Not Processed</MenuItem>
  //         <MenuItem value="Cash On Delivery">Cash On Delivery</MenuItem>
  //         <MenuItem value="Processing">Processing</MenuItem>
  //         <MenuItem value="Dispatched">Dispatched</MenuItem>
  //         <MenuItem value="Cancelled">Cancelled</MenuItem>
  //         <MenuItem value="Completed">Completed</MenuItem>
  //       </Select>
  //     </FormControl>
  //       </TableRow>
  //       <TableRow>
  //         <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
  //           <Collapse in={open} timeout="auto" unmountOnExit>
  //             <Box sx={{ margin: 1 }}>
  //               <Typography variant="h6" gutterBottom component="div">
  //                 Detail
  //               </Typography>
  //               <Table size="small" aria-label="purchases">
  //                 <TableHead>
  //                   <TableRow>
  //                     <TableCell>Title</TableCell>
  //                     <TableCell>Color</TableCell>
  //                     <TableCell >Count</TableCell>
  //                     <TableCell >Resident</TableCell>
  //                     <TableCell >Price</TableCell>
  //                     <TableCell >Shipping</TableCell>
  //                   </TableRow>
  //                 </TableHead>
  //                 <TableBody>
  //                   {row.products.map((productRow) => (
  //                     <TableRow >
  //                       <TableCell component="th" scope="row">
  //                         {productRow.product.title}
  //                       </TableCell>
  //                       <TableCell >{productRow.color}</TableCell>
  //                       <TableCell>{productRow.count}</TableCell>
                        
  //                       <TableCell >{productRow.product.resident}</TableCell>
  //                       <TableCell >{productRow.product.price}</TableCell>
  //                       <TableCell >
  //                       {productRow.product.shipping}
  //                       </TableCell>
  //                     </TableRow>
  //                   ))}
  //                 </TableBody>
  //               </Table>
  //             </Box>
  //           </Collapse>
  //         </TableCell>
  //       </TableRow>
  //     </React.Fragment>
  //   );
  // }
  

  // const showOrderInTable = (order) => (

    // <table className="table table-bordered">
    //   <thead className="thead-light">
    //     <tr>
    //       <th scope="col">Title</th>
    //       <th scope="col">Price</th>
    //       <th scope="col">Resident</th>
    //       <th scope="col">Color</th>
    //       <th scope="col">Count</th>
    //       <th scope="col">Shipping</th>
    //     </tr>
    //   </thead>

    //   <tbody>
    //     {order.products.map((p, i) => (
    //       <tr key={i}>
    //         <td>
    //           <b>{p.product.title}</b>
    //         </td>
    //         <td>{p.product.price}</td>
    //         <td>{p.product.resident}</td>
    //         <td>{p.color}</td>
    //         <td>{p.count}</td>
    //         <td>
    //           {p.product.shipping === "Yes" ? (
    //             <CheckCircleOutlined style={{ color: "green" }} />
    //           ) : (
    //             <CloseCircleOutlined style={{ color: "red" }} />
    //           )}
    //         </td>
    //       </tr>
    //     ))}
    //   </tbody>
    // </table>
  // );
  const TableHeaderCell = withStyles(() => ({
    root: {
      fontSize: "14px",
      fontWeight: "bold",
      fontFamily:"sans-serif"
    },
  }))(TableCell);
  return (
    <>
    <TableContainer component={Paper} style={{boxShadow:"rgba(168, 168, 168, 0.25) 0px 0px 7px 3px"}} >
      <Table sx={{ minWidth: 700 }} >
        <TableHead style={{borderRadius:"6px solid #dfe4e8"}}>
          <TableRow >
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
          {orders.map((row) => (
            <StyledTableRow key={row._id}>
              <StyledTableCell component="th" scope="row">
                {row._id}
              </StyledTableCell>
              <StyledTableCell align="center">{row.paymentIntent.amount}</StyledTableCell>
              <StyledTableCell align="center">{row.paymentIntent.currency}</StyledTableCell>
              <StyledTableCell align="center">{row.paymentIntent.payment_method_types[0]}</StyledTableCell>
              <StyledTableCell align="center">{row.paymentIntent.status.toUpperCase()}</StyledTableCell>
              <StyledTableCell align="right">{new Date(row.paymentIntent.created * 1000).toLocaleString()}</StyledTableCell>
              <StyledTableCell align="center">{row.orderStatus}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
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
