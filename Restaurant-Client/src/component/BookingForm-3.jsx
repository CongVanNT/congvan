import { useState } from "react";
import "../css/BookingForm-3.css";
import axios from "axios";

function BookingForm3() {
  const [phone, setPhone] = useState("");
  const [person, setPerson] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Kiểm tra dữ liệu
    if (!phone || !time) {
      setErrorMessage("Số điện thoại và giờ là bắt buộc.");
      return;
    }

    const data = {
      phone,
      person,
      date,
      time,
    };

    try {
      // Gửi yêu cầu đến API để đặt bàn
      const response = await axios.post("API/bookings", data);
      
      // Kiểm tra phản hồi từ API
      if (response.status === 201) {
        console.log("Đặt bàn thành công:", response.data);
        // Reset form
        setPhone("");
        setPerson("");
        setDate("");
        setTime("");
        setErrorMessage("");
      }
    } catch (error) {
      // Xử lý lỗi từ API
      if (error.response) {
        setErrorMessage(error.response.data.message || "Có lỗi xảy ra. Vui lòng thử lại.");
      } else {
        setErrorMessage("Có lỗi xảy ra. Vui lòng thử lại.");
      }
    }
  };

  return (
    <div className="bgr-booking3">
      <div className="booking-container container-vphu">
        <div className="hours-section">
          <h2 className="hours-title">Giờ Mở Cửa</h2>
          <ul className="hours-list">
            <li className="hours-item">
              <span className="day">Thứ Bảy:</span>
              <span className="time">6:00 sáng - 12:00 trưa</span>
            </li>
            <li className="hours-item">
              <span className="day">Chủ Nhật:</span>
              <span className="time">8:30 sáng - 11:00 tối</span>
            </li>
            <li className="hours-item">
              <span className="day">Thứ Hai:</span>
              <span className="time">9:00 sáng - 10:30 tối</span>
            </li>
            <li className="hours-item">
              <span className="day">Thứ Ba:</span>
              <span className="time">8:00 sáng - 12:00 trưa</span>
            </li>
            <li className="hours-item">
              <span className="day">Thứ Tư:</span>
              <span className="time">9:45 sáng - 10:00 tối</span>
            </li>
            <li className="hours-item">
              <span className="day">Thứ Năm:</span>
              <span className="time">8:15 sáng - 12:00 trưa</span>
            </li>
            <li className="hours-item-closed">
              <span className="day">Thứ Sáu:</span>
              <div className="closed-day">
                <span className="time">Đóng cửa</span>
              </div>
            </li>
          </ul>
          <div className="bgr-booking-2">
            <div className="animation-background"></div>
          </div>
        </div>
        <div className="booking-anchor-point">
          <div className="wrapper-booking">
            <div className="booking-section">
              {errorMessage && <p className="error">{errorMessage}</p>}
              <form onSubmit={handleSubmit} className="booking-form">
                <div className="form-group">
                  <label htmlFor="phone" className="label-booking">
                    Số Điện Thoại
                  </label>
                  <input
                    type="text"
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="input-booking"
                    placeholder="+4733378901"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="person" className="label-booking">
                    Số Người
                  </label>
                  <select id="person" value={person}
                    onChange={(e) => setPerson(e.target.value)}
                    className="select-booking">
                    <option value="1">1 Người</option>
                    <option value="2">2 Người</option>
                    <option value="3">3 Người</option>
                    <option value="4">4 Người</option>
                    <option value="5">5 Người</option>
                    <option value="6">6 Người</option>
                    <option value="7">7 Người</option>
                    <option value="8">8 Người</option>
                    <option value="9">9 Người</option>
                    <option value="10">10 Người</option>
                    <option value="Larger Quantity">Số Lượng Lớn Hơn</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="date" className="label-booking">
                    Ngày
                  </label>
                  <input type="date" id="date" value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="input-booking" />
                </div>

                <div className="form-group">
                  <label htmlFor="time" className="label-booking">
                    Giờ
                  </label>
                  <input
                    type="time"
                    id="time"
                    onChange={(e) => setTime(e.target.value)}
                    className="input-booking"
                    value={time}
                  />
                </div>

                <button type="submit" className="button-booking">
                  Đặt Bàn
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookingForm3;
