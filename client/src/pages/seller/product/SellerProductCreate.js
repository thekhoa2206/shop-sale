import React, { useState, useEffect } from "react";
import SellerNav from "../../../components/nav/SellerNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { createProduct } from "../../../functions/product";
import ProductCreateForm from "../../../components/forms/ProductCreateForm";
import { getCategories, getCategorySubs } from "../../../functions/category";
import FileUpload from "../../../components/forms/FileUpload";
import { LoadingOutlined } from "@ant-design/icons";
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
  creator: ""
};

const SellerProductCreate = () => {
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

  const handleCatagoryChange = (e) => {
    e.preventDefault();
    console.log("CLICKED CATEGORY", e.target.value);
    setValues({ ...values, subs: [], category: e.target.value });
    getCategorySubs(e.target.value).then((res) => {
      console.log("SUB OPTIONS ON CATGORY CLICK", res);
      setSubOptions(res.data);
    });
    setShowSub(true);
  };

  return (
    <Box style={{width: "100%", display: "flex", minHeight: 800}}>
        <Box style={{width: 230, minHeight: "100%"}}><SellerNav /></Box>
        <Box style={{marginTop: 20, marginLeft: 50,width: 1500}}>
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
        </Box>
      </Box>

  );
};

export default SellerProductCreate;
