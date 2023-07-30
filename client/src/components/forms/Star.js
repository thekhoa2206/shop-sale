import React from "react";
import StarRating from "react-star-ratings";

const Star = ({ starClick, numberOfStars }) => (
  <>
    <StarRating
      changeRating={() => starClick(numberOfStars)}
      numberOfStars={numberOfStars}
      starDimension="16px"
      starSpacing="2px"
      starHoverColor="#ffc84c"
      starEmptyColor="#ffc84c"
    />
    <br />
  </>
);

export default Star;
