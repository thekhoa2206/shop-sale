import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import {
  createCategory,
  getCategories,
  removeCategory,
} from "../../../functions/category";
import { Link } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import CategoryForm from "../../../components/forms/CategoryForm";
import LocalSearch from "../../../components/forms/LocalSearch";
import { tableCellClasses } from '@mui/material/TableCell';
import { withStyles } from "@material-ui/styles";
import { Table, TableCell, TableBody, TableContainer, TableHead, TableRow, Typography, styled, Paper, Button } from "@material-ui/core";
import Addcategory from "./common/Addcategory";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    fontFamily: "sans-serif"
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
const CategoryCreate = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [openAdd, setOpenAdd] = React.useState(false);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  // step 1
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = () =>
    getCategories().then((c) => setCategories(c.data));

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(name);
    setLoading(true);
    createCategory({ name }, user.token)
      .then((res) => {
        // console.log(res)
        setLoading(false);
        setName("");
        toast.success(`"${res.data.name}" is created`);
        loadCategories();
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };

  const handleRemove = async (slug) => {
    // let answer = window.confirm("Delete?");
    // console.log(answer, slug);
    if (window.confirm("Delete?")) {
      setLoading(true);
      removeCategory(slug, user.token)
        .then((res) => {
          setLoading(false);
          toast.error(`${res.data.name} deleted`);
          loadCategories();
        })
        .catch((err) => {
          if (err.response.status === 400) {
            setLoading(false);
            toast.error(err.response.data);
          }
        });
    }
  };
const handleChangeAdd = ()=> {
  setOpenAdd(true);
  console.log("testt",openAdd);
}
  // step 4
  const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword);
  const TableHeaderCell = withStyles(() => ({
    root: {
      fontSize: "14px",
      fontWeight: "bold",
      fontFamily: "sans-serif"
    },
  }))(TableCell);
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col">
          {loading ? (
            <h4 className="text-danger">Loading..</h4>
          ) : (
            <h4>category</h4>
          )}
          <Button onClick={handleChangeAdd}>Add</Button>
          <CategoryForm
            handleSubmit={handleSubmit}
            name={name}
            setName={setName}
          />
          <hr/>
          {/* step 2 and step 3 */}
          <LocalSearch keyword={keyword} setKeyword={setKeyword} />

          {/* step 5 */}
          <TableContainer component={Paper} style={{ boxShadow: "rgba(168, 168, 168, 0.25) 0px 0px 7px 3px" }} >
            <Table sx={{ minWidth: 700 }} >
              <TableHead style={{ borderRadius: "6px solid #dfe4e8" }}>
                <TableRow >
                  <TableHeaderCell >Id</TableHeaderCell>
                  <TableHeaderCell align="center">Name</TableHeaderCell>
                  <TableHeaderCell align="center">CreateAt</TableHeaderCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {categories.filter(searched(keyword)).map((x) => (
                  <StyledTableRow key={x._id}>
                    <StyledTableCell component="th" scope="row">
                      <Link to={`/admin/category/${x.slug}`}>
                        {x._id}
                      </Link>
                    </StyledTableCell>
                    <StyledTableCell align="center">{x.name}</StyledTableCell>
                    <StyledTableCell align="right">{new Date(x.createdAt * 1000).toLocaleString()}</StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Addcategory
          open={openAdd}
          />
        </div>
      </div>
      
    </div>
  );
};

export default CategoryCreate;
