import StarRatings from "react-star-ratings";
import { useState } from "react";
import "../style/Rate.css";
import { toast } from "react-toastify";
import { api } from "../api";

function ProductRate(props) {
  // console.log(props);
  // eslint-disable-next-line react/prop-types
  const product = props.product;
  // eslint-disable-next-line react/prop-types
  const params = props.params
  // eslint-disable-next-line react/prop-types
  const setVote = props.setVote

  const [rating, setRating] = useState(0);
  const [ratingCount, setRatingCount] = useState(0); // Theo dõi số lần đánh giá

  let token = localStorage.getItem("token");
  
  let auth = localStorage.getItem("auth");
  if (auth) {
    auth = JSON.parse(auth);
  }
  // console.log(auth);
  
  function changeRating(newRating) {
    if (!token) {
      toast.error("Vui lòng đăng nhập");
    } else {
      token = JSON.parse(token);
    }
    let config = {
      headers: {
        Authorization: "Bearer " + token,
        "Content-type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
    };
    console.log(newRating)
    setRating(newRating);
    console.log(rating);

    const formData = new FormData();
    formData.append("user_id", auth.id);
    // eslint-disable-next-line react/prop-types
    formData.append("product_id", product.id);
    formData.append("rating", newRating);

    // console.log(formData)
    api
      .post("/ratings", formData, config)
      .then((res) => {
        console.log(res);
        if(res.data.data){
          toast.success(res.data.message)
          api
          // eslint-disable-next-line react/prop-types
          .get("products/" + params.slug)
          .then((res) =>{
            console.log(res)
            setVote(res.data.data)
          })
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <StarRatings
      className="star-rate"
      rating={rating}
      starRatedColor="yellow"
      changeRating={changeRating}
      numberOfStars={5}
      name="rating"
    />
  );
}
export default ProductRate;
