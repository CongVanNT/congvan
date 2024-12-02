import StarRatings from "react-star-ratings";
// import { useState } from "react";
import "../style/Rate.css";
// import { useState } from "react";

function Rate(props) {
  // console.log(props)
  // eslint-disable-next-line react/prop-types
  const vote = props.vote?.average_rating || 0
  // console.log(vote)
  // console.log(Number(vote))

  return (
    <StarRatings
      className="star-rate"
      rating={Number(vote)} //Chuyển đổi vote thành số
      starRatedColor="yellow"
      numberOfStars={5}
      name="rating"
      
    />
  );
}
export default Rate;
