import '../css/BookingForm-2.css';
import imgBoking2 from '../assets/img-booking2.jpg';

function BookingForm() {
  return (
    <div className="bgr-booking">
      <div className="booking-container">
        <div className="wrapper-booking">
          <div className="booking-section">
            <h1 className="title-booking">Đặt bàn</h1>
            <form className="booking-form">
              <div className="form-group">
                <label htmlFor="phone" className="label-booking">Số điện thoại</label>
                <input type="text" id="phone" className="input-booking" placeholder="+4733378901" />
              </div>

              <div className="form-group">
                <label htmlFor="person" className="label-booking">Số người</label>
                <select id="person" className="select-booking">
                  <option>1 Người</option>
                  <option>2 Người</option>
                  <option>3 Người</option>
                  <option>4 Người</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="date" className="label-booking">Ngày</label>
                <input type="date" id="date" className="input-booking" />
              </div>

              <div className="form-group">
                <label htmlFor="time" className="label-booking">Giờ</label>
                <input type="time" id="time" className="input-booking" defaultValue="10:00 AM" />
              </div>

              <button type="submit" className="button-booking">Đặt Bàn</button>
            </form>
          </div>

          <div className="image-section">
            <img src={imgBoking2} alt="Phục vụ thức ăn" className="image-booking2" />
          </div>
        </div>

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
      </div>
    </div>
  );
}

export default BookingForm;
