import { useNavigate } from "react-router-dom";
import "../css/BookingForm-3.css";
import { toast } from "react-toastify";

function BookingForm3() {
  const navigate = useNavigate("");
  let token = localStorage.getItem("token");
  if (token) {
    token = JSON.parse(token);
  }
  const handleBooking = () => {
    if (!token) {
      toast.error("Vui lòng đăng nhập");
    } else {
      navigate("/booking-table");
    }
  };

  return (
    <div className="bgr-booking3 text-vphu">
      <div className="booking-container container-vphu">
        <div className="hours-section">
          <h2 className="hours-title title-vphu">Giờ Mở Cửa</h2>
          <ul className="hours-list">
            {/* Nội dung giờ mở cửa */}
            <li className="hours-item">
              <span className="day">Thứ 2:</span>
              <div className="closed-day">
                <span className="time">9:00 : 22:00</span>
              </div>
            </li>
            <li className="hours-item">
              <span className="day">Thứ 3:</span>
              <div className="closed-day">
                <span className="time">9:00 : 22:00</span>
              </div>
            </li>
            <li className="hours-item">
              <span className="day">Thứ 4:</span>
              <div className="closed-day">
                <span className="time">9:00 : 22:00</span>
              </div>
            </li>
            <li className="hours-item">
              <span className="day">Thứ 5:</span>
              <div className="closed-day">
                <span className="time">9:00 : 22:00</span>
              </div>
            </li>
            <li className="hours-item">
              <span className="day">Thứ 6:</span>
              <div className="closed-day">
                <span className="time">9:00 : 22:00</span>
              </div>
            </li>
            <li className="hours-item">
              <span className="day">Thứ 7:</span>
              <div className="closed-day">
                <span className="time">9:00 : 22:00</span>
              </div>
            </li>
            <li className="hours-item-closed">
              <span className="day">Chủ Nhật:</span>
              <div className="closed-day">
                <span className="time">9:00 : 22:00</span>
              </div>
            </li>
          </ul>
        </div>

        <div className="booking-anchor-point">
          <div className="wrapper-booking">
            <div className="booking-section">
              <div className="booking-form">
                <h2 className="booking-message-title subtitle-vphu">
                  HIGHTFIVE +
                </h2>
                <p className="booking-message">
                Hãy tận hưởng bữa ăn tuyệt vời cùng gia đình và bạn bè tại không gian ấm cúng và sang trọng của chúng tôi. Chúng tôi luôn sẵn sàng phục vụ bạn với thực đơn đa dạng và phong cách phục vụ chuyên nghiệp. 
                </p>
                <p className="booking-message">
                Hãy đảm bảo đặt bàn trước để có được chỗ ngồi yêu thích của bạn. Chúng tôi rất vui được chào đón bạn đến với HIGHTFIVE Restaurant+.
                </p>

                <button
                  type="button"
                  className="button-booking"
                  onClick={handleBooking}
                >
                  Đặt bàn ngay
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookingForm3;
