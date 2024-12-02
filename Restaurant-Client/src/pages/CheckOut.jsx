import { useNavigate } from "react-router-dom";
import "../style/CheckOut.css";
import tang1 from "../assets/tang1.png";
import tang2 from "../assets/tang2.png";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { api } from "../api";

const ReservationForm = () => {
  const navigate = useNavigate();
  const [selectedTable, setSelectedTable] = useState(null);
  const [tables, setTables] = useState([]);
  const [orderButtonVisible, setOrderButtonVisible] = useState(false); // hiển thị nút đặt món
  const [bookingData, setBookingData] = useState({
    name: "",
    phone: "",
    email: "",
    date: "",
    time: "",
    guests: "",
    note: "",
  });
 
  useEffect(() => {
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
      .get("/tables", config)
      .then((res) => {
        console.log(res);
        setTables(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });

   
  }, []);

  useEffect(() => {
    let auth = localStorage.getItem("auth");
    if (auth) {
      auth = JSON.parse(auth);
      // console.log(auth);
      setBookingData((prevData) => ({
        ...prevData,
        name: auth.name,
        email: auth.email,
        phone: auth.phone_number,
      }));
    }
    const currentDate = new Date();
    const month = currentDate.getMonth() + 1; // Lấy tháng (0 - 11, cộng thêm 1 để thành tháng thực)
    const year = currentDate.getFullYear();
    let bookingInfo = localStorage.getItem("bookingInfo");
    if (bookingInfo) {
      bookingInfo = JSON.parse(bookingInfo);
      // console.log(bookingInfo);
      // console.log(bookingInfo.selectedTable);
      setBookingData((prevData) => ({
        ...prevData,
        time: bookingInfo.customTime,
        date: `${bookingInfo.selectedDate.day}/${bookingInfo.selectedDate.date}/${month}/${year}`, // Sửa lại nếu có lỗi
      }));
    }
  }, []);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingData({ ...bookingData, [name]: value });
  };
  const handleTableSelection = (table) => {
    if (table.status === "available") {
      setSelectedTable(table.id);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let flag = true;
    if (!bookingData.guests) {
      toast.error("Vui lòng nhập số người");
      flag = false;
    }
    if (selectedTable === null) {
      toast.error("Vui lòng chọn bàn");
      flag = false;
    }
    if (flag) {
      let auth = localStorage.getItem("auth");
      if (auth) {
        auth = JSON.parse(auth);
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
      // console.log(auth)
      const formData = new FormData();
      formData.append("table_id", selectedTable);
      formData.append("user_id", auth.id);
      formData.append("date", bookingData.date);
      formData.append("time", bookingData.time);
      formData.append("guest_count", bookingData.guests);
      formData.append("notes", bookingData.note);
      // auth.id

      api
        .post("/cart/add-cart", formData, config)
        .then((res) => {
          console.log(res);
          if (res.data.status) {
            
            const updatedBookingInfo = {
              ...JSON.parse(localStorage.getItem("bookingInfo")), // Lấy bookingInfo từ localStorage
              selectedTable, // Thêm thông tin số bàn
              guests: bookingData.guests, // Thêm số khách
              note: bookingData.note, // Thêm ghi chú
            };
      
            // Lưu lại vào localStorage
            localStorage.setItem("bookingInfo", JSON.stringify(updatedBookingInfo));
      
            setOrderButtonVisible(true); // Hiển thị nút Đặt món

            toast.success("Đặt bàn thành công!", { autoClose: 3000 });
            toast.success("Bạn có muốn chọn món không", { autoClose: 3000 });
            setTimeout(() => {
              toast.success("Nếu có hãy bấm chọn món để tiếp tục", {
                autoClose: 3000,
              });
            }, 3000);
            localStorage.setItem(
              "cartID",
              (res.data.data.id)
            );
          } else {
            toast.error(res.data.message);
          }
        })
        .catch((error) => console.log(error));
      // lưu id cart vào local
      // localStorage.getItem("cartID", JSON.stringify(res.data.data))

     
    }
  };

  // const handleTableSelection = (table) => {
  //   setSelectedTable(table);
  // };
  // console.log(tables);
  console.log({ bookingData });
  // console.log(selectedTable);

  return (
    <div className="reservation-container container-vphu text-vphu">
      <h1 className="reservation-title-checkout title-vphu">Đặt Bàn</h1>
      <div className="restaurant-content">
        <div className="restaurant-map">
          <h3 className="title-restaurant-map subtitle-vphu">
            Sơ Đồ Tầng 1 & 2
          </h3>
          <div className="restaurant-map-image-wrapper">
            <div className="restaurant-map-item-image">
              <img src={tang1} alt="Tầng 1" />
              <p className="restaurant-map-image-text">Tầng 1</p>
            </div>
            <div className="restaurant-map-item-image">
              <img src={tang2} alt="Tầng 2" />
              <p className="restaurant-map-image-text">Tầng 2</p>
            </div>
          </div>
        </div>

        <div className="choose-table-box">
          <h3 className="choose-table-title subtitle-vphu">Lựa chọn bàn</h3>
          <div className="choose-table-buttons">
            {tables.map((table) => (
              <button
                key={table.id}
                className={`table-button ${
                  selectedTable === table.id ? "table-button-active" : ""
                } ${
                  table.status === "reserved" || table.status === "occupied"
                    ? "table-button-disabled"
                    : ""
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  handleTableSelection(table);
                }}
                disabled={
                  table.status === "reserved" || table.status === "occupied"
                }
              >
                {table.number}
              </button>
            ))}
            {/* {tables.map((table) => (
              <button
                key={table}
                className={`table-button ${
                  selectedTable === table ? "table-button-active" : ""
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  handleTableSelection(table);
                }}
              >
                {table}
              </button>
            ))} */}
          </div>
        </div>
      </div>

      <form className="reservation-form" onSubmit={handleSubmit}>
        <h3 className="title-info-book-table subtitle-vphu">
          Thông tin đặt bàn
        </h3>
        <div className="form-group">
          <label htmlFor="selectedTable">Bàn Đã Chọn:</label>
          <input
            className="preinstall-book"
            type="text"
            name="selectedTable"
            value={selectedTable ? `Bàn ${selectedTable}` : ""}
            placeholder="Chưa chọn bàn"
            readOnly
          />
        </div>

        <div className="form-group">
          <label htmlFor="name">Họ & Tên</label>
          <input
            className="preinstall-book"
            type="text"
            name="name"
            value={bookingData.name}
            onChange={handleInputChange}
            readOnly
            placeholder="Họ & tên"
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Số điện thoại (*)</label>
          <input
            className="preinstall-book"
            type="number"
            name="phone"
            value={bookingData.phone}
            onChange={handleInputChange}
            placeholder="Số điện thoại"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            className="preinstall-book"
            type="email"
            name="email"
            value={bookingData.email}
            onChange={handleInputChange}
            readOnly
            placeholder="Email"
          />
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="date">Ngày</label>
            <input
              className="preinstall-book"
              value={bookingData.date}
              name="date"
              placeholder="Ngày"
              readOnly
            />
          </div>
          <div className="form-group">
            <label htmlFor="time">Thời gian</label>
            <input
              className="preinstall-book"
              // type="time"
              value={bookingData.time}
              name="time"
              placeholder="Thời gian"
              readOnly
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="guests">Số khách</label>
          <input
            className="preinstall-book"
            type="number"
            name="guests"
            // value={reservationData.guests}
            onChange={handleInputChange}
            placeholder="Số khách"
            min="1"
            max="15"
          />
          <p className="time-hint">Chỉ nhận từ 1 khách đến 15 khách</p>
        </div>
        <div className="form-group">
          <label htmlFor="note">Ghi chú</label>
          <textarea
            className="preinstall-book"
            name="note"
            // value={reservationData.note}
            onChange={handleInputChange}
            placeholder="Gợi ý: thêm ghế trẻ em, ..."
          ></textarea>
        </div>
        <div className="form-actions">
          <button type="submit" className="btn btn-submit-checkout">
            Đặt bàn
          </button>
          {orderButtonVisible && (
            <button
              // onClick={() => navigate("/menu")} // Điều hướng đến trang menu

              // bấm đặt món là chuyển qua trang menu cùng id bàn
              onClick={() => {
                const bookingInfo = JSON.parse(
                  localStorage.getItem("bookingInfo")
                );
                if (bookingInfo && bookingInfo.selectedTable) {
                  navigate(`/menu?tableId=${bookingInfo.selectedTable}`); // Điều hướng sang Menu với tableId
                } else {
                  toast.error("Không tìm thấy bàn đã chọn!");
                }
              }}
              // onClick={handleBooking}
              // className="btn btn-order-now"
              className="btn btn-order-now"
            >
              Đặt món
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ReservationForm;
