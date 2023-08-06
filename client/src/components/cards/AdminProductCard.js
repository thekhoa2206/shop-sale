import React from "react";
import { Card } from "antd";
import defaultIMG from "../../images/default.png";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
const { Meta } = Card;

const AdminProductCard = ({ product, handleRemove }) => {
  // destructure
  const { title, description, images, slug } = product;

  return (
    <Box  style={{border: "1px solid #E5E9EB", borderRadius: 6, width: 400}}>
    <Box>
      <img
          src={images && images.length ? images[0].url : defaultIMG}
          style={{ height: "300px", objectFit: "cover", width: "100%" }}
          className="p-1"
        />
    </Box>
    <Box style={{padding: "10px 20px"}}>
      <Typography>{title}</Typography>
      <Typography>{`${description && description.substring(0, 40)}...`}</Typography>
      <Box display={"flex"}>
      <Typography style={{fontWeight: "bold", fontSize: 20}}>${product.price}</Typography>
      <Box marginLeft={35} display={"flex"}>
      <Link to={`/admin/product/${slug}`}>
          <EditIcon className="text-warning" />
          </Link>
        <DeleteForeverIcon
          onClick={() => handleRemove(slug)}
         className="text-danger"
        />
        </Box>
      </Box>
    </Box>
  </Box>
  );
};

export default AdminProductCard;
