import { useEffect, useState } from "react";
import "../style/CartProduct.css";
import Modal from "../component/Modal";
import { api } from "../api";
// import { toast } from "react-toastify";

const Cart = () => {
  const [cartProduct, setCartProduct] = useState([]);
  // const [cartID, setCartID] = useState();
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState([]);
  const [error, setError] = useState(false);

  let auth = localStorage.getItem("auth");
  if (auth) {
    auth = JSON.parse(auth);
    console.log(auth);
  }

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
  useEffect(() => {
    api
      .get("/cart/list/" + auth.id, config)
      .then((res) => {
        console.log(res);
        if(res.data.status){
          setCartProduct(res.data.data);

        }
      })
      .catch((error) => console.log(error));
  }, []);

  // Hiển thị modal khi bấm vào "Xem"
  const handleShowDetails = (id, tableID) => {
    console.log(id);
    localStorage.setItem("cartID", id);
    localStorage.setItem("tableID", tableID);
    api
      .get("/cart/list-product/" + id, config)
      .then((res) => {
        console.log(res);
        if (res.data.status) {
          // toast.error("")
          setModalContent(res.data.data);
          setError(true);
        } else {
          setError(false);
          setModalContent(res.data.message);
        }
      })
      .catch((error) => console.log(error));

    // setModalContent(products);
    setModalOpen(true);
  };

  const handleRemoveTable =(id) =>{
    console.log(id)
    api
    .post("")
    .then()
    .catch()
  }



  console.log(cartProduct);

  return (
    <div className="cart-container container-vphu">
      <h1 className="title-cart-page title-vphu">Giỏ Hàng</h1>

      {
        cartProduct.length === 0 ? (
      <p className="empty-cart-message">Giỏ hàng của bạn đang trống</p>
    ) : (
      cartProduct.map((reservation) => (
        <div key={reservation.id} className="reservation-cart-container">
          {/* Thông tin bàn */}
          <div className="reservation-details">
            <p className="reservation-table">
              <strong>Bàn:</strong> {reservation.table_id}
            </p>
            <p className="reservation-guests">
              <strong>Khách:</strong> {reservation.guest_count} người
            </p>
            <p className="reservation-date">
              <strong>Ngày:</strong> {reservation.date}
            </p>
            <p className="reservation-time">
              <strong>Giờ:</strong> {reservation.time}
            </p>
            <button
              className="reservation-toggle-button"
              onClick={() => handleRemoveTable(reservation.id)}
            >
              Xóa bàn
            </button>
          </div>

          {/* Danh sách sản phẩm */}
          <div className="cart-items">
            <div className="cart-item-cart-product">
              <div className="cart-item-image">
                <span className="cart-item-image-text">
                  Món ăn hiện tại: {reservation.count}
                </span>
              </div>
              <div className="cart-item-info">
                <div className="cart-item-name">
                  <strong
                    style={{ cursor: "pointer", color: "#d2a679" }}
                    onClick={() =>
                      handleShowDetails(reservation.id, reservation.table_id)
                    }
                  >
                    Xem món
                  </strong>
                </div>
              </div>
              <div className="cart-item-total">
                <strong>Tổng: {reservation.total} VND</strong>
              </div>
            </div>
          </div>
          <button
            className="button-checkout-item"
            // onClick={() => handleCheckout(reservation.id)}
          >
            Thanh Toán
          </button>
        </div>
      ))
    )
    }

      <Modal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        content={modalContent}
        error={error}
      />
    </div>
  );
};

export default Cart;