import { Box, Typography } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";

const ProductListItems = ({ product }) => {
  const {
    price,
    category,
    subs,
    shipping,
    color,
    resident,
    quantity,
    sold,
    // creator
  } = product;

  return (
    <Box>
      {category && (
        <Typography >
          <span style={{fontWeight: "bold", fontSize: 14}}>Category:{" "}</span>
          <Link
            to={`/category/${category.slug}`}
            className="label label-default label-pill pull-xs-right"
          >
            {category.name}
          </Link>
        </Typography>
      )}

      {subs && (
        <Typography>
          <span style={{fontWeight: "bold", fontSize: 14}}>Sub Categories:{" "}</span>
          {subs.map((s) => (
            <Link
              key={s._id}
              to={`/sub/${s.slug}`}
              className="label label-default label-pill pull-xs-right"
            >
              {s.name ? s.name : "---"}
            </Link>
          ))}
        </Typography>
      )}

      <Typography>
      <span style={{fontWeight: "bold", fontSize: 14}}>Shipping: {" "}</span>
        <span className="label label-default label-pill pull-xs-right">
          {shipping}
        </span>
      </Typography>

      <Typography>
      <span style={{fontWeight: "bold", fontSize: 14}}>Color: {" "}</span>
        <span className="label label-default label-pill pull-xs-right">
          {color}
        </span>
      </Typography>

      <Typography>
      <span style={{fontWeight: "bold", fontSize: 14}}>Resident: {" "}</span>
        <span className="label label-default label-pill pull-xs-right">
          {resident}
        </span>
      </Typography>

      <Typography>
        <span style={{fontWeight: "bold", fontSize: 14}}>Available: {"  "}</span>
        <span className="label label-default label-pill pull-xs-right">
          {quantity}
        </span>
      </Typography>

      <Typography>
      <span style={{fontWeight: "bold", fontSize: 14}}>Sold: {"  "}</span>
        <span className="label label-default label-pill pull-xs-right">
          {sold}
        </span>
      </Typography>

      {/* <li className="list-group-item">
        Created By{" "}
        <span className="label label-default label-pill pull-xs-right">
          {product.creator.name}
        </span>
      </li> */}
    </Box>
  );
};

export default ProductListItems;
