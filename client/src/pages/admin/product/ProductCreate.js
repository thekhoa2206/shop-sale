import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { createProduct } from "../../../functions/product";
import ProductCreateForm from "../../../components/forms/ProductCreateForm";
import { getCategories, getCategorySubs } from "../../../functions/category";
import FileUpload from "../../../components/forms/FileUpload";
import { LoadingOutlined } from "@ant-design/icons";
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import { Typography } from "@mui/material";
import { Box } from "@material-ui/core";
const initialState = {
  title: "",
  description: "",
  price: "",
  categories: [],
  category: "",
  subs: [],
  shipping: "",
  quantity: "",
  images: [],
  colors: ["Red", "Blue", "Green", "Yellow", "Orange", "Purple", "Pink", "Black", "White", "Gray", "Brown", "Cyan", "Navy"],
  residents: ["Tay Ho", "Ba Dinh", "Hoan Kiem", "Dong Da", "Cau Giay", "Hai Ba Trung", "Hoang Mai", "Long Bien"],
  color: "",
  resident: "",
};

const ProductCreate = () => {
  const [values, setValues] = useState(initialState);
  const [subOptions, setSubOptions] = useState([]);
  const [showSub, setShowSub] = useState(false);
  const [loading, setLoading] = useState(false);

  // redux
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = () =>
    getCategories().then((c) => setValues({ ...values, categories: c.data }));

  const handleSubmit = (e) => {
    if(!values.category){
      toast.error(`Category not empty`);
      return;
    }
    if(!values.title){
      toast.error(`Title not empty`);
      return;
    }
    if(!values.color){
      toast.error(`Color not empty`);
      return;
    }
    if(!values.description){
      toast.error(`Description not empty`);
      return;
    }
    if(!values.price){
      toast.error(`Price not empty`);
      return;
    }
    if(!values.quantity){
      toast.error(`Quantity not empty`);
      return;
    }
    if(!values.resident){
      toast.error(`Resident not empty`);
      return;
    }
    if(!values.shipping){
      toast.error(`Shipping not empty`);
      return;
    }
    if(!values.images || values.images.length === 0){
      toast.error(`Images not empty`);
      return;
    }
    e.preventDefault();
    createProduct(values, user.token)
      .then((res) => {
        console.log(res);
        window.alert(`"${res.data.title}" is created`);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        // if (err.response.status === 400) toast.error(err.response.data);
        toast.error(err.response.data.err);
      });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    // console.log(e.target.name, " ----- ", e.target.value);
  };

  const handleChangeColor = (e) => {
    setValues({ ...values, color: e.target.value });
    // console.log(e.target.name, " ----- ", e.target.value);
  };
  const handleChangeResident = (e) => {
    setValues({ ...values, resident: e.target.value});
    // console.log(e.target.name, " ----- ", e.target.value);
  };
  const handleChangeSub = (e) => {
    setValues({ ...values, subs: e.target.value });
    // console.log(e.target.name, " ----- ", e.target.value);
  };
  const handleChangeShipping= (e) => {
    setValues({ ...values, shipping: e.target.value });
    // console.log(e.target.name, " ----- ", e.target.value);
  };
  const handleCatagoryChange = (e) => {
    setValues({ ...values, subs: [], category: e.target.value });
    if(e.target.value){
      getCategorySubs(e.target.value).then((res) => {
        if(res.data){
          setSubOptions(res.data);
        }
      });
      setShowSub(true);
    }
  };

  return (

    <>
        {/* <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>

        <div className="col-md-10">
          {loading ? (
            <LoadingOutlined className="text-danger h1" />
          ) : (
            <h4>Product create</h4>
          )}
          <hr />

          {JSON.stringify(values.subs)}

          <div className="p-3">
            <FileUpload 
            values={values}
            setValues={setValues}
            setLoading={setLoading}
            />
          </div>

          <ProductCreateForm
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            setValues={setValues}
            values={values}
            handleCatagoryChange={handleCatagoryChange}
            subOptions={subOptions}
            showSub={showSub}
          />
        </div>
      </div>
    </div> */}
    <Box style={{width: "100%", display: "flex", minHeight: 800}}>
        <Box style={{width: 230, minHeight: "100%"}}><AdminNav /></Box>
        <Box style={{marginTop: 20, marginLeft: 50, width: 1500}}>
              <Typography variant="h5" marginLeft={0} marginBottom={"10px"}>Add Product</Typography>
        <Grid container xs={12} style={{width: "100%"}}>
          <Grid xs={9}>
            <ProductCreateForm
              handleSubmit={handleSubmit}
              handleChange={handleChange}
              setValues={setValues}
              values={values}
              handleCatagoryChange={handleCatagoryChange}
              subOptions={subOptions}
              showSub={showSub}
              handleChangeColor={handleChangeColor}
              handleChangeResident={handleChangeResident}
              handleChangeSub={handleChangeSub}
              handleChangeShipping={handleChangeShipping}
            />
          </Grid>
          <Grid xs={2} padding={3}>
            <FileUpload 
              values={values}
              setValues={setValues}
              setLoading={setLoading}
            />
          </Grid>
        </Grid>
        </Box>
      </Box>

    </>
  );
};

export default ProductCreate;
