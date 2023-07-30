import { Box, Typography } from "@material-ui/core";
import React from "react";
import StarRating from "react-star-ratings";

export const showAverage = (p) => {
  if (p && p.ratings) {
    let ratingsArray = p && p.ratings;
    let total = [];
    let length = ratingsArray.length;
    // console.log("length", length);

    ratingsArray.map((r) => total.push(r.star));
    let totalReduced = total.reduce((p, n) => p + n, 0);
    // console.log("totalReduced", totalReduced);

    let highest = length * 5;
    // console.log("highest", highest);

    let result = (totalReduced * 5) / highest;
    // console.log("result", result);

    return (
      <div className="text-center pt-1 pb-3">
        
        <Box style={{display: "flex"}}>
          <StarRating
            starDimension="16px"
            starSpacing="2px"
            starRatedColor="#ffc84c"
            rating={result}
            editing={false}
          />{" "}
          <Typography style={{color: "#5B6871", marginTop: 4, marginLeft: 5, fontSize: 14}}>({`${p.ratings.length} Reviews`})</Typography>
        </Box>
      </div>
    );
  }
};
