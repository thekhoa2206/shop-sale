import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import { tableCellClasses } from "@mui/material/TableCell";
import { withStyles } from "@material-ui/styles";
import {
  getCoupons,
  removeCoupon,
  createCoupon,
} from "../../../functions/coupon";
import "react-datepicker/dist/react-datepicker.css";
import { DeleteOutlined } from "@ant-design/icons";
import AdminNav from "../../../components/nav/AdminNav";
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Table,
  TableCell,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  styled,
  Paper,
  Button,
  Box,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Unstable_Grid2";
import AddCopoun from "./AddCopoun";
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 40,
  },
}));
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    fontFamily: "sans-serif",
  },
}));
const CreateCouponPage = () => {
  const [name, setName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [discount, setDiscount] = useState("");
  const [loading, setLoading] = useState("");
  const [coupons, setCoupons] = useState([]);
    const [openAdd, setOpenAdd] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
    const [data, setData] = useState({});

  // redux
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadAllCoupons();
  }, []);

  const loadAllCoupons = () => getCoupons().then((res) => setCoupons(res.data));

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // console.table(name, expiry, discount);
    createCoupon({ name, expiry, discount }, user.token)
      .then((res) => {
        setLoading(false);
        loadAllCoupons(); // load all coupons
        setName("");
        setDiscount("");
        setExpiry("");
        toast.success(`"${res.data.name}" is created`);
      })
      .catch((err) => console.log("create coupon err", err));
  };

  const handleRemove = (couponId) => {
    if (window.confirm("Delete?")) {
      setLoading(true);
      removeCoupon(couponId, user.token)
        .then((res) => {
          loadAllCoupons(); // load all coupons
          setLoading(false);
          toast.error(`Coupon "${res.data.name}" deleted`);
        })
        .catch((err) => console.log(err));
    }
  };
    const handleChangeAdd = () => {
    setOpenAdd(!openAdd);
  };
  const handleChangeEdit = (data) => {
    setData(data);
    setOpenEdit(!openEdit);
    console.log("data", data);
  };
  const handleChangeEdit1 = () => {
    setOpenEdit(!openEdit);
  };
  const TableHeaderCell = withStyles(() => ({
    root: {
      fontSize: "14px",
      fontWeight: "bold",
      fontFamily: "sans-serif",
    },
  }))(TableCell);
  return (
    <>   
     {/* <div className="container-fluid">
    <div className="row">
      <div className="col-md-2">
        <AdminNav />
      </div>
      <div className="col-md-10">
        {loading ? (
          <h4 className="text-danger">Loading...</h4>
        ) : (
          <h4>Coupon</h4>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="text-muted">Name</label>
            <input
              type="text"
              className="form-control"
              onChange={(e) => setName(e.target.value)}
              value={name}
              autoFocus
              required
            />
          </div>

          <div className="form-group">
            <label className="text-muted">Discount %</label>
            <input
              type="text"
              className="form-control"
              onChange={(e) => setDiscount(e.target.value)}
              value={discount}
              required
            />
          </div>

          <div className="form-group">
            <label className="text-muted">Expiry</label>
            <br />
            <DatePicker
              className="form-control"
              selected={new Date()}
              value={expiry}
              onChange={(date) => setExpiry(date)}
              required
            />
          </div>

          <button className="btn btn-outline-primary">Save</button>
        </form>

        <br />

        <h4>{coupons.length} Coupons</h4>

        <table className="table table-bordered">
          <thead className="thead-light">
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Expiry</th>
              <th scope="col">Discount</th>
              <th scope="col">Action</th>
            </tr>
          </thead>

          <tbody>
            {coupons.map((c) => (
              <tr key={c._id}>
                <td>{c.name}</td>
                <td>{new Date(c.expiry).toLocaleDateString()}</td>
                <td>{c.discount}%</td>
                <td>
                  <DeleteOutlined
                    onClick={() => handleRemove(c._id)}
                    className="text-danger pointer"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div> */}
  <Box style={{width: "100%", display: "flex", minHeight: "820px"}}>
        <Box style={{width: 230, minHeight: "100%"}}><AdminNav /></Box>
        <Box style={{marginTop: 20, marginLeft: 50, width: 1600}}>
        <Box>
            {loading ? (
              <h4 className="text-danger">Loading..</h4>
            ) : (
              <Box >
                <Box style={{ display: "flex", marginTop: "24px" }}>
                  <Box>
                    <Typography variant="h4">Coupon</Typography>
                  </Box>
                  <Box>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleChangeAdd}
                      style={{ float: "right", marginLeft: "850px" }}
                    >
                      Add Coupon
                    </Button>
                  </Box>
                </Box>

                <hr />
                {/* step 2 and step 3
                <LocalSearch keyword={keyword} setKeyword={setKeyword} /> */}

                {/* step 5 */}
                <TableContainer
                  component={Paper}
                  style={{
                    boxShadow: "rgba(168, 168, 168, 0.25) 0px 0px 7px 3px",
                  }}
                >
                  <Table sx={{ minWidth: 700 }}>
                    <TableHead style={{ borderRadius: "6px solid #dfe4e8" }}>
                      <TableRow>
                      <TableHeaderCell>Id</TableHeaderCell>
                        <TableHeaderCell align="center">Name</TableHeaderCell>
                        <TableHeaderCell align="right">
                        Discount
                        </TableHeaderCell>
                        <TableHeaderCell align="right">Expiry</TableHeaderCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {coupons.map((x) => (
                        <StyledTableRow key={x._id}>
                          <StyledTableCell width={150} scope="row">
                            
                              {x._id}

                          </StyledTableCell>
                          <StyledTableCell align="center" width={150}>
                            {x.name}
                          </StyledTableCell>
                          <StyledTableCell align="right" width={150}>
                            {x.discount}%
                          </StyledTableCell>
                          <StyledTableCell align="right" width={150}>
                          {new Date(x.expiry).toLocaleDateString()}
                          </StyledTableCell>
                          <StyledTableCell  width={50}>
                          <DeleteIcon
                    onClick={() => handleRemove(x._id)}
                    className="text-danger pointer"
                  />
                          </StyledTableCell>
                        </StyledTableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
      <AddCopoun
      open={openAdd}
      onClose={handleChangeAdd}
      data={loadAllCoupons}
      />
  </>
 
  );
};

export default CreateCouponPage;
