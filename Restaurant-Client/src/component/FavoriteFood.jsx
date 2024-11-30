import "../css/FavoriteFood.css";
import { useEffect, useState } from "react";
// import { api } from "../api";
import imgFavoriteFood from "../assets/favorite-food.jpg";
import user from "../assets/user.png";
import { api } from "../api";

const FoodCategory = () => {
  // Khai báo state để lưu danh sách món ăn
  const [foodItems, setFoodItems] = useState([]);

  // Dữ liệu mẫu
  const sampleFoodItems = [
    {
      id: 1,
      name: "Miếng Pizza",
      description: "Phô mai, Thịt nguội & Dứa",
      rating: 5.0,
      image: imgFavoriteFood,
      orderLink: "#",
    },
    {
      id: 2,
      name: "Burger Phô Mai",
      description: "Bánh mì kẹp thịt bò tươi với phô mai và rau tươi",
      rating: 4.8,
      image: imgFavoriteFood,
      orderLink: "#",
    },
    {
      id: 3,
      name: "Thiên Đường Gà",
      description: "Gà nướng với sốt đặc biệt",
      rating: 4.5,
      image: imgFavoriteFood,
      orderLink: "#",
    },
    {
      id: 4,
      name: "Shawarma",
      description: "Thịt cừu ngon với sốt tỏi",
      rating: 5.0,
      image: imgFavoriteFood,
      orderLink: "#",
    },
  ];

  useEffect(() => {
    // Gọi API để lấy danh sách món ăn
    // api
    //   .get("/products") // Đường dẫn đến API
    //   .then((res) => {
    //     console.log(res);
    //     if (res && res.data && res.data.products) {
    //       const items = res.data.products.map(item => ({
    //         id: item.id,
    //         name: item.name,
    //         description: item.description,
    //         rating: item.rating,
    //         image: item.image || imgFavoriteFood,
    //         orderLink: item.orderLink || "#",
    //       }));
          setFoodItems(sampleFoodItems); // Cập nhật danh sách món ăn từ API
    //     //   console.log("Đã lấy được danh sách món ăn thành công");
    //     }
    //   })
    //   .catch((error) => {
    //     console.error("Có lỗi xảy ra khi lấy danh sách món ăn:", error);
    //     // Sử dụng dữ liệu mẫu nếu có lỗi
    //     // setFoodItems(sampleFoodItems); 
    //   });
  }, []);

  return (
    <div className="food-category container-vphu">
      <h2 className="category-title">Món Ăn Ngon Nhất</h2>
      <div className="food-items">
        {foodItems.map((item) => (
          <div className="food-card" key={item.id}>
            <img src={item.image} alt={item.name} className="food-image" />
            <div className="rating-section">
              <span className="rating">
                <i className="fa-solid fa-star icon-star"> </i>
                {item.rating}
              </span>
              <div className="reviewers">
                <img src={user} alt="người đánh giá" />
                <img src={user} alt="người đánh giá" />
                <img src={user} alt="người đánh giá" />
              </div>
            </div>
            <div className="food-info">
              <h3 className="food-name">{item.name}</h3>
              <p className="food-description">{item.description}</p>
              <a href={item.orderLink} className="order-link">
                <p className="order-now">ĐẶT NGAY</p>
                <i className="fa-solid fa-arrow-right fa-rotate-by icon-arrow"></i>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FoodCategory;
