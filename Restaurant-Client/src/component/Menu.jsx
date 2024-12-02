import { useState, useEffect } from "react";
import { api, url } from "../api"; // Đường dẫn đến file cấu hình API
import "../css/Menu.css";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { FaHeart } from "react-icons/fa";

function Menu() {
  // let cartLocal = localStorage.getItem("cart");
  // if (cartLocal) {
  //   cartLocal = JSON.parse(cartLocal);
  // }
  // let token = localStorage.getItem("token");
  // if (token) {
  //   token = JSON.parse(token);
  // }

  const [menuItem, setMenuItem] = useState([]);
  const [tableId, setTableId] = useState(null);

  let favouriteLocal = localStorage.getItem("favourite");
  if (favouriteLocal) {
    favouriteLocal = JSON.parse(favouriteLocal);
  }
  const [favourite, setFavourite] = useState(favouriteLocal); // lấy local ra để thêm tiếp tục sản phẩm
  const location = useLocation();


  useEffect(() => {
    api
      .get("/product-categories/6")
      .then((res) => {
        setMenuItem(res.data.data);
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

  // const addToCart = (id) => {
  //   if (!token) {
  //     toast.error("Vui lòng đăng nhập");
  //     return;
  //   }

  //   const newCart = { ...cart };

  //   if (newCart[id]) {
  //     newCart[id] += quantity;
  //     toast.success("Thêm vào giỏ hàng thành công");
  //   } else {
  //     newCart[id] = quantity;
  //     toast.success("Thêm vào giỏ hàng thành công");
  //   }

  //   setCart(newCart);
  //   localStorage.setItem("cart", JSON.stringify(newCart));
  // };

  // const toggleFavourite = (item) => {
  //   if (!token) {
  //     toast.error("Vui lòng đăng nhập");
  //     return;
  //   }
  //   const updatedFavourites = favourites.some(fav => fav.id === item.id)
  //     ? favourites.filter(fav => fav.id !== item.id)
  //     : [...favourites, item];

  //   setFavourites(updatedFavourites);
  //   localStorage.setItem("favourites", JSON.stringify(updatedFavourites));
  // };

  return (
    <div className="our-menu-content container-vphu text-vphu">
      <h2 className="title-our-menu title-vphu">Món Ăn Của Chúng Tôi</h2>
      <div className="menu-grid">
        {menuItem.length === 0 ? (
          <p>Không có món ăn nào trong danh mục này.</p>
        ) : (
          menuItem.map((item, index) => (
            <div className="menu-item-home" key={item.id}>
              <Link className="menu-image" to={"/product-detail/" + item.slug}>
                <img src={`${url}/${item.image_url}`} alt={item.name} />
              </Link>
              <div className="menu-details">
                <Link to={"product-detail/" + item.slug}>
                  <h3 className="menu-title">{item.name}</h3>
                </Link>
                <p className="menu-description">
                  {JSON.parse(item.ingredients)
                    .map((ing) => ing.value)
                    .join(", ")}
                </p>
                <p className="menu-price">${item.price}</p>
                <button className="order-button" onClick={() => addToCart()}>
                  Order now
                </button>

                <div
                  className={`heart-icon ${
                    index === 2 ||
                    index === 3 ||
                    index === 6 ||
                    index === 7 ||
                    index === 10 ||
                    index === 11
                      ? "right"
                      : "left"
                  }`}
                  onClick={() => addToFavourite(item.id)}
                  style={{
                    position: "absolute",
                    top: "10px",
                    [index === 2 ||
                    index === 3 ||
                    index === 6 ||
                    index === 7 ||
                    index === 10 ||
                    index === 11
                      ? "right"
                      : "left"]: "10px",
                  }}
                >
                  {/* <FaRegHeart color="white" size={25} /> */}

                  <FaHeart color="red" size={25} />
                </div>
                {/* <div
            className={`heart-icon ${index === 2 || index === 3 || index === 6 || index === 7 || index === 10 || index === 11 ? "right" : "left"}`}
            // onClick={() => toggleFavourite(item)}
            style={{ position: "absolute", top: "10px", [index === 2 || index === 3 || index === 6 || index === 7 || index === 10 || index === 11 ? "right" : "left"]: "10px" }}
          >
            {favourites.some(fav => fav.id === item.id) ? (
              <FaHeart color="red" size={25} />
            ) : (
              <FaRegHeart color="white" size={25} />
            )}
          </div> */}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Menu;
