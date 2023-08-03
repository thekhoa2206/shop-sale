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

import LocalSearch from "../../../components/forms/LocalSearch";
import { tableCellClasses } from "@mui/material/TableCell";
import { withStyles } from "@material-ui/styles";
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
import Grid from "@mui/material/Unstable_Grid2";
import Addcategory from "./common/Addcategory";
import { createStyles, Theme } from "@material-ui/core";
import Editcategory from "./common/Editcategory";
const styles = (theme) =>
  createStyles({
    container: {
      display: "flex",
      flexDirection: "column",
      backgroundColor: "red",
      padding: "0 32px 40px",
      flex: "1 1 auto",
      "& .MuiChip-root": {
        padding: "4px 4px",
        fontSize: "14px",
        height: "24px",
      },
      "& .MuiTableContainer-root.stickyHeader": {
        backgroundColor: "#F3F4F5",
      },
      "& .MuiTableHead-root": {
        backgroundColor: "#F3F4F5",
        "& .MuiTableCell-paddingNone": {
          padding: "0 16px",
        },
        "& .MuiTableCell-root": {
          paddingTop: "12px",
          paddingBottom: "12px",
        },
      },
    },
    listBox: {
      backgroundColor: "white",
      boxShadow: "0px 2px 4px rgba(168, 168, 168, 0.25)",
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      height: "60px",
    },
    headerItem: {
      display: "flex",
      alignItems: "center",
    },
    utilities: {
      display: "flex",
      flexDirection: "column",
      minHeight: 86,
      backgroundColor: "white",
    },
    tabLabel: {
      position: "relative",
      display: "flex",
      "&.Mui-selected:hover .deleteTabIcon": {
        display: "block",
      },
      "& .MuiTab-wrapper": {
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        maxWidth: 167,
        display: "block",
      },
    },
    filterAndSearchBox: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      padding: "16px",
    },
    searchbox: {
      flex: 1,
    },

    description: {
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
    },

    accountRolesLabel: {
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
      maxWidth: "150px",
    },
    tenantRoleLabel: {
      fontSize: "14px",
      lineHeight: "20px",
      fontWeight: 500,
      overflow: "hidden",
      textOverflow: "ellipsis",
      display: "-webkit-box",
      "-webkit-line-clamp": 2,
      "-webkit-box-orient": "vertical",
    },
    dInline: {
      width: "fit-content",
      display: "inline-block",
      maxWidth: "100%",
    },
    headerTitleLabel: {
      fontSize: "20px",
      lineHeight: "28px",
      color: "#0F1824",
      fontWeight: 500,
    },
  });
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

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 40,
  },
}));
const CategoryCreate = () => {
  const classes = styles();
  const { user } = useSelector((state) => ({ ...state }));
  const [openAdd, setOpenAdd] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
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
  // step 4
  const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword);
  const TableHeaderCell = withStyles(() => ({
    root: {
      fontSize: "14px",
      fontWeight: "bold",
      fontFamily: "sans-serif",
    },
  }))(TableCell);
  return (
    <>
      <Box style={{width: "100%", display: "flex", minHeight: 800}}>
        <Box style={{width: 230, minHeight: "100%"}}><AdminNav /></Box>
        <Box style={{marginTop: 20, marginLeft: 50, width: 1500}}>
        <Box style={{width: "100%"}}>
            {loading ? (
              <h4 className="text-danger">Loading..</h4>
            ) : (
              <Box className={classes.container}>
                <Box style={{ display: "flex", marginTop: "24px" }}>
                  <Box>
                    <Typography variant="h4">Category</Typography>
                  </Box>
                  <Box>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleChangeAdd}
                      style={{ float: "right", marginLeft: "850px" }}
                    >
                      Add Category
                    </Button>
                  </Box>
                </Box>

                <hr />
                {/* step 2 and step 3 */}
                <LocalSearch keyword={keyword} setKeyword={setKeyword} />

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
                          CreateAt
                        </TableHeaderCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {categories.filter(searched(keyword)).map((x) => (
                        <StyledTableRow key={x._id}>
                          <StyledTableCell width={150} scope="row">
                            <Link onClick={() => handleChangeEdit(x)}>
                              {x._id}
                            </Link>
                          </StyledTableCell>
                          <StyledTableCell align="center" width={150}>
                            {x.name}
                          </StyledTableCell>
                          <StyledTableCell align="right" width={150}>
                            {new Date(x.createdAt * 1000).toLocaleString()}
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
      <Addcategory
        open={openAdd}
        onClose={handleChangeAdd}
        data={loadCategories}
      />
      <Editcategory
        open={openEdit}
        onClose={handleChangeEdit1}
        data={loadCategories}
        initData={data}
      />
    </>
  );
};

export default CategoryCreate;
