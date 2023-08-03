import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getCategory, updateCategory } from "../../../functions/category";
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import CategoryForm from "../../../components/forms/CategoryForm";
import { Box } from "@material-ui/core";

const CategoryUpdate = ({ history, match }) => {
  const { user } = useSelector((state) => ({ ...state }));

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { slug } = useParams();

  useEffect(() => {
    loadCategory();
  }, []);

  const loadCategory = () => {
    getCategory(slug)
      .then((c) => setName(c.data.name))
      .catch((error) => {
        console.error('Error loading category:', error);
        // Handle the error accordingly (e.g., show an error message to the user)
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(name);
    setLoading(true);
    updateCategory(slug, { name }, user.token)
      .then((res) => {
        // console.log(res)
        setLoading(false);
        setName("");
        toast.success(`"${res.data.name}" is updated`);
        navigate("/admin/category");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };

  

  return (
    
    <Box style={{width: "100%", display: "flex", minHeight: "820px"}}>
        <Box style={{width: 230, minHeight: "100%"}}><AdminNav /></Box>
        <Box style={{marginTop: 20, marginLeft: 50, width: 1600}}>
        {loading ? (
            <h4 className="text-danger">Loading..</h4>
          ) : (
            <h4>Update category</h4>
          )}
          <CategoryForm 
          handleSubmit = {handleSubmit}
          name={name}
          setName = {setName}
          />
        </Box>
      </Box>
  );
};

export default CategoryUpdate;
