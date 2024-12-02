import { useEffect, useState } from "react";
import "../css2/Favourite.css"; // Ensure the path is correct
import { api, url } from "../api";
import { toast } from "react-toastify";

function FavouritePage() {
  const [product, setProduct] = useState([]);
  useEffect(() => {
    let favouriteLocal = localStorage.getItem("favourite");
    if (favouriteLocal) {
      favouriteLocal = JSON.parse(favouriteLocal);
    }
    // console.log(cart);

    //   setProduct(cart);
    api
      .post("/product/cart", favouriteLocal)
      .then((res) => {
        console.log(res);
        setProduct(res.data.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleDelete = (id) => {
    // console.log("id", id);

    setProduct(product.filter((product) => product.id !== id)); // xóa ở
    toast.success("Đã xóa sản phẩm")

    const itemDelete = JSON.parse(localStorage.getItem("favourite"));

    // console.log(itemDelete[id]);
    
    if (itemDelete && itemDelete[id]) {
      delete itemDelete[id];
      console.log(itemDelete);

      localStorage.setItem("favourite", JSON.stringify(itemDelete));
    }

  };
  console.log(product)

  return (
    <>
      <div className="favourite-page container-vphu">
      <h1 className="title-cart-page title-vphu">Món ăn yêu thích</h1>
        <div className="cart">
          <div className="cart-container">
            <div className="cart-header">
              <div className="header-item">Món ăn</div>
              <div className="header-item">Giá tiền</div>
              <div className="header-item">Số lượng</div>
              <div className="header-item"> Xóa</div>
            </div>
            {product.length === 0 ?(
              <p className="empty-favourite-message">Món ăn yêu thích của bạn đang trống</p>

            ):

            product.map((item) => {
              return (
                <div className="cart-item" key={item.id}>
                  <button className="remove-btn"></button>
                  <div className="product-info">
                    <img
                      src={`${url}/${item.image_url}`}
                      alt="Creamy Latte Coffee"
                      className="productCart-image"
                    />
                    <div className="product-details">
                      <h3 className="product-name">{item.name}</h3>
                      <p className="product-description">
                       {/* {item.summary} */}
                       {item?.summary
              ? item.summary.replace(/<\/?p>/g, "")
              : "Không có thông tin"}
                      </p>
                    </div>
                  </div>
                  <p className="product-price">{item.price} VND</p>
                  <div className="quantity-control">
                    {/* <button className="quantity-btn">-</button> */}
                    <input
                      type="number"
                      value={item.qty}
                      className="quantity-input"
                      readOnly
                    />
                    {/* <button className="quantity-btn">+</button> */}
                  </div>
                  <p onClick={() =>handleDelete(item.id)} className="product-total product-delete">Xóa</p>
                </div>
              );
            })}
            
          </div>
        </div>
      </div>
    </>
  );
}

export default FavouritePage;
