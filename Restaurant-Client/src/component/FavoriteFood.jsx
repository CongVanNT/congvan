import "../css/FavoriteFood.css";
import { useEffect, useState } from "react";
import { api, url } from "../api";
import { toast } from "react-toastify";
import { Link, useLocation } from "react-router-dom";

const FoodCategory = () => {
  const [foodItems, setFoodItems] = useState([]);
  const [tableId, setTableId] = useState(null);

  let favouriteLocal = localStorage.getItem("favourite");
  if (favouriteLocal) {
    favouriteLocal = JSON.parse(favouriteLocal);
  }
  const [favourite, setFavourite] = useState(favouriteLocal); // lấy local ra để thêm tiếp tục sản phẩm

  const location = useLocation();

  useEffect(() => {
    api
      .get("/latestProducts")
      .then((res) => {
        console.log(res);
        setFoodItems(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    // Lấy query param từ URL
    const params = new URLSearchParams(location.search);
    // console.log(params)

    const id = params.get("tableId");
    // console.log(id);
    if (id) {
      setTableId(id);
      toast.info(`Bạn đang đặt món cho bàn số: ${id}`);
    }
  }, [location]);

  const addToCart = () => {
    if (!tableId) {
      toast.error("Vui lòng đặt bàn");
      return;
    }
  };
  const addToFavourite = (id) => {
    let token = localStorage.getItem("token");
   
    if(!token){
      toast.error("Vui lòng đăng nhập")
    }else{
    token = JSON.parse(token);
      const newFavourite = { ...favourite }; // giữ lại dữ liệu trước đó

      if (newFavourite[id]) {
        // nếu id có rồi, tức là qty > 1 thì +1
        // lấy id làm key của newCart
        newFavourite[id] += 1;
        toast.success("Thêm vào yêu thích thành công");
      } else {
        // nếu id chưa có thì là lấy id đó làm key rồi cho bằng qty là bằng 1
        newFavourite[id] = 1;
        toast.success("Thêm vào yêu thích thành công");
      }

      // console.log(newCart);
      setFavourite(newFavourite);
      // abc(newCart)
      setFavourite(newFavourite);
      // lưu vào local
      localStorage.setItem("favourite", JSON.stringify(newFavourite));
    }

  };

  return (
    <div className="food-category container-vphu text-vphu">
      <h4 className="category-subtitle subtitle-vphu">MÓN ĂN</h4>
      <h2 className="category-title title-vphu">Top Thực Phẩm Nổi Bật</h2>
      <div className="food-items">
        {foodItems.map((item) => (
          <div className="food-card" key={item.id}>
            <Link className="menu-image" to={"product-detail/" + item.slug}>
              <img
                src={`${url}/${item.image_url}`}
                alt={item.name}
                className="food-image"
              />
            </Link>
            <div className="rating-section">
              <span className="rating">
                <i className="fa-solid fa-star icon-star"></i>
                <p className="number-stars">{item.rating}</p>
              </span>
              <div
                className="reviewers "
                // className={`reviewers ${clickedReviewer.some((i) => i.id === item.id) ? "clicked" : ""}`}
                // onClick={() => handleReviewerClick(item.id, item)}
                  onClick={() =>addToFavourite(item.id)}
              >
                <i
                  className="fa-regular fa-heart clicked-icon"
                ></i>
              </div>
            </div>
            <div className="food-info">
              <Link to={"/product-detail/" + item.slug}>
                <h3 className="food-name">{item.name}</h3>
              </Link>
              <p className="favorite-food-description">
                {/* {item.ingredients} */}
                {JSON.parse(item.ingredients)
                  .map((ing) => ing.value)
                  .join(", ")}
              </p>
              <div className="btn-oder">
                <a href={item.orderLink} className="order-link">
                  <p className="order-now" onClick={() => addToCart()}>
                    Đặt Ngay
                  </p>
                  <div className="icon-arrow">
                    <i className="fa-solid fa-arrow-right fa-rotate-by"></i>
                  </div>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FoodCategory;
