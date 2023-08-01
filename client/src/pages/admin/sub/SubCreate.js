import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getCategories, getCategory } from "../../../functions/category";
import { createSub, getSub, removeSub, getSubs } from "../../../functions/sub";
import { Link } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import CategoryForm from "../../../components/forms/CategoryForm";
import LocalSearch from "../../../components/forms/LocalSearch";
import { tableCellClasses } from "@mui/material/TableCell";
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
import { withStyles } from "@material-ui/styles";
import Grid from "@mui/material/Unstable_Grid2";
import AddcSub from "./common/AddSub";
import AddSub from "./common/AddSub";
import EditSub from "./common/EditSub";
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
const SubCreate = () => {
  const { user } = useSelector((state) => ({ ...state }));

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [subs, setSubs] = useState([]);
  const [openAdd, setOpenAdd] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [data, setData] = useState({});
  // step 1
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    loadCategories();
    loadSubs();
  }, []);

  const loadCategories = () =>
    getCategories().then((c) => setCategories(c.data));

  const findCategories = (data) => {
    console.log("oke", categories);
    let categorys = categories.filter((x) => x._id === data);
    return categorys.name;
  };
  const loadSubs = () => getSubs().then((s) => setSubs(s.data));

  const handleRemove = async (slug) => {
    // let answer = window.confirm("Delete?");
    // console.log(answer, slug);
    if (window.confirm("Delete?")) {
      setLoading(true);
      removeSub(slug, user.token)
        .then((res) => {
          setLoading(false);
          toast.error(`${res.data.name} deleted`);
          loadSubs();
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
    let test =categories.filter((x)=>x._id === data.parent);
    setName(test[0].name)
    console.log("pppp",name);
    setData(data);
    setOpenEdit(!openEdit);
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
      <Grid container spacing={0.5} style={{ display: "flex" }}>
        <Grid xs={2}>
          <Box style={{ marginTop: "24px" }}>
            <AdminNav />
          </Box>
        </Grid>
        <Grid xs={9} marginBottom={12}>
          <Box>
            {loading ? (
              <h4 className="text-danger">Loading..</h4>
            ) : (
              <Box>
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
                      Add Sub
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
                        <TableHeaderCell align="center">
                          Category
                        </TableHeaderCell>
                        <TableHeaderCell align="right">
                          CreateAt
                        </TableHeaderCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {subs.filter(searched(keyword)).map((x) => (
                        <StyledTableRow key={x._id}>
                          <StyledTableCell width={150} scope="row">
                            <Link onClick={() => handleChangeEdit(x)}>
                              {x._id}
                            </Link>
                          </StyledTableCell>
                          <StyledTableCell align="center" width={150}>
                            {x.name}
                          </StyledTableCell>
                          <StyledTableCell align="center" width={150}>
                            {findCategories(x.parent)}
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
        </Grid>
        <AddSub open={openAdd} onClose={handleChangeAdd} data={loadSubs} />
        <EditSub
          open={openEdit}
          onClose={handleChangeEdit1}
          data={loadSubs}
          initData={data}
          categoryName={name}
        />
      </Grid>
    </>
  );
};

export default SubCreate;
