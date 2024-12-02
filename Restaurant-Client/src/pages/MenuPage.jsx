import { useState, useEffect } from "react";
import { api, url } from "../api";
import { toast } from "react-toastify"; // Thêm thông báo toast
import { FaHeart } from "react-icons/fa";
import "../style/MenuPage.css";
import { Link, useLocation } from "react-router-dom";
// import { set } from "lodash";

const MenuPage = () => {
  const [categoriesWithFoods, setCategoriesWithFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeCategory, setActiveCategory] = useState(null);

  let favouriteLocal = localStorage.getItem("favourite");
  if (favouriteLocal) {
    favouriteLocal = JSON.parse(favouriteLocal);
  }
  const [favourite, setFavourite] = useState(favouriteLocal); // lấy local ra để thêm tiếp tục sản phẩm

  // let bookingFoodLocal = localStorage.getItem("bookingFoodLocal");
  // if (bookingFoodLocal) {
  //   bookingFoodLocal = JSON.parse(bookingFoodLocal);
  // }
  // console.log(bookingFoodLocal);

  const location = useLocation();
  // const [bookingFood, setBookingFood] = useState({bookingFoodLocal});
  // const [bookingFood, setBookingFood] = useState({
  //   id: "",
  //   qty: "",
  // });
  const [foodId, setFoodId] = useState("");
  const [foodQty, setFoodQty] = useState("1");
  const [tableId, setTableId] = useState(null);

  

  // bấm đặt món là chuyển qua trang menu cùng id bàn

  useEffect(() => {
    // Lấy query param từ URL
    const params = new URLSearchParams(location.search);
    // console.log(params)

    const id = params.get("tableId");
    // console.log(id);
    if (id) {
      setTableId(id);
      // const idTable = { idTable: id };
      // localStorage.setItem("bookingFoodLocal", JSON.stringify(idTable));
      toast.info(`Bạn đang đặt món cho bàn số: ${id}`);
    }
  }, [location]);

  // bấm đặt món là chuyển qua trang menu cùng id bàn
  const handleInputChange = (e) => {
    setFoodQty(e.target.value);
  };

  let cartID = localStorage.getItem("cartID")?? null;
  // console.log(cartID)
  
  const addToCart = (foodId, foodName) => {
    // console.log(foodId);
    if (!tableId) {
      toast.error("Vui lòng đặt bàn");
      return;
    }
    setFoodId(foodId)
    const formData = new FormData();
    formData.append("cart_id", cartID);
    formData.append("product_id", foodId);
    formData.append("quantity", foodQty);

    let token = localStorage.getItem("token");
      if (token) {
        token = JSON.parse(token);
      }
      let config = {
        headers: {
          Authorization: "Bearer " + token,
          "Content-type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
      };

    api
    .post("/cart/add-product", formData, config)
    .then(res =>{
      console.log(res)
      if(res.data.status){
        toast.success(`Món ăn ${foodName} đã được thêm vào bàn ${tableId}`)
      }else{
        toast.error(`Thêm món ăn ${foodName} thất bại  `)

      }
    })
    .catch(error => console.log(error))

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
    // if (token) {

    //   token = JSON.parse(token);
    //   const newFavourite = { ...favourite }; // giữ lại dữ liệu trước đó

    //   if (newFavourite[id]) {
    //     // nếu id có rồi, tức là qty > 1 thì +1
    //     // lấy id làm key của newCart
    //     newFavourite[id] += 1;
    //     toast.success("Thêm vào giỏ hàng thành công");
    //   } else {
    //     // nếu id chưa có thì là lấy id đó làm key rồi cho bằng qty là bằng 1
    //     newFavourite[id] = 1;
    //     toast.success("Thêm vào giỏ hàng thành công");
    //   }

    //   // console.log(newCart);
    //   setFavourite(newFavourite);
    //   // abc(newCart)
    //   setFavourite(newFavourite);
    //   // lưu vào local
    //   localStorage.setItem("favourite", JSON.stringify(newFavourite));
    // }
  };



  // console.log(bookingFood);
  console.log({tableId});
  console.log({foodQty})
  console.log({foodId})



  useEffect(() => {
    const fetchCategoriesAndFoods = async () => {
      try {
        setLoading(true);
        setError("");

        // Lấy danh mục sản phẩm
        const categoryResponse = await api.get("/product-categories");
        const categories = categoryResponse.data.data;

        // Lấy món ăn theo từng danh mục
        const categoriesWithFoodsPromises = categories.map(async (category) => {
          const foodResponse = await api.get(
            `/product-categories/${category.id}`
          );
          const foods = foodResponse.data.data;

          // Xử lý danh sách nguyên liệu nếu có
          const updatedFoods = foods.map((food) => {
            const parsedIngredients = food.ingredients
              ? JSON.parse(food.ingredients)
              : [];
            return {
              ...food,
              ingredientsList: parsedIngredients
                .slice(0, 4) // Giới hạn 4 nguyên liệu
                .map((item) => item.value),
            };
          });

          return {
            ...category,
            foods: updatedFoods,
          };
        });

        const categoriesWithFoods = await Promise.all(
          categoriesWithFoodsPromises
        );
        setCategoriesWithFoods(categoriesWithFoods);
        setActiveCategory(categories[0]?.id || null); // Đặt danh mục đầu tiên làm active
      } catch (err) {
        console.error("Error fetching categories or foods:", err);
        setError("Không thể tải dữ liệu danh mục và món ăn");
      } finally {
        setLoading(false);
      }
    };

    fetchCategoriesAndFoods();
  }, []);

  if (loading) {
    return <div>Đang tải dữ liệu...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="bgr-menu-page">
      <div className="menu-page container-vphu text-vphu">
        <div className="menu-header">
          <div className="menu-title">
            <h1 className="menu-main-title title-vphu">Thực Đơn Đặc Biệt</h1>
            {tableId && (
              <p className="text-vphu menu-table-padding">
                Bạn đang đặt món cho bàn số: {tableId}
              </p>
            )}
          </div>
        </div>

        <div className="menu-main-container">
          <div className="menu-sidebar">
            <h3 className="title-menu-sidebar subtitle-vphu"> Danh Mục</h3>
            <ul className="menu-sidebar-list">
              {categoriesWithFoods.map((category) => (
                <li
                  key={category.id}
                  className={`menu-sidebar-item ${
                    activeCategory === category.id ? "active" : ""
                  }`}
                  onClick={() => {
                    setActiveCategory(category.id);
                    const categoryTitleElement = document.getElementById(
                      `category-title-${category.id}`
                    );
                    if (categoryTitleElement) {
                      categoryTitleElement.scrollIntoView({
                        behavior: "smooth",
                        block: "center",
                      });
                    }
                  }}
                >
                  {category.name}
                </li>
              ))}
            </ul>
          </div>

          <div className="menu-categories-foods">
            {categoriesWithFoods.map((category) => (
              <div key={category.id} className="menu-category-section">
                <h2
                  id={`category-title-${category.id}`}
                  className="menu-category-title subtitle-vphu"
                >
                  {category.name}
                </h2>
                <div className="menu-items">
                  {category.foods.map((food) => (
                    <div key={food.id} className="menu-item-page">
                      <Link to={"/product-detail/" + food.slug}>
                        <img
                          className="menu-item-page-img"
                          src={`${url}/${food.image_url}`}
                          alt={food.name}
                        />
                      </Link>
                      <Link to={"/product-detail/" + food.slug}><h3 className="menu-item-page-title">{food.name}</h3></Link>
                      <p className="menu-item-page-ingredients">
                        {food.ingredientsList.length > 0
                          ? food.ingredientsList.join(", ")
                          : "Không có thông tin nguyên liệu"}
                      </p>
                      <span className="menu-item-page-price">
                        {food.price} VNĐ
                      </span>
                      <div className="order-controls">
        <input
          type="number"
          className="menu-item-page-quantity"
          defaultValue="1"
          min="1"
          onChange={handleInputChange}
          max="10"
        />
        <button
          className="menu-item-page-order-btn"
          onClick={() => addToCart(food.id, food.name)}
        >
          Đặt Món
        </button>
      </div>
                      {/* <button
                        className="menu-item-page-order-btn"
                        onClick={() => addToCart(food.id)}
                      >
                        Đặt Món
                      </button> */}
                      <div
                        className="heart-icon-menu-page"
                        onClick={() => addToFavourite(food.id)}
                        style={{
                          position: "absolute",
                          top: "10px",
                          left: "10px",
                        }}
                      >
                        <FaHeart color="red" size={20} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuPage;
