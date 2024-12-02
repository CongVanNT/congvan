import { useState, useEffect } from "react";
import "../css/BookingTable.css";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function BookingTable() {
  const [selectedDate, setSelectedDate] = useState(null); // Ngày được chọn
  const [customTime, setCustomTime] = useState("00:00"); // Lưu giá trị giờ:phút
  const [dates, setDates] = useState([]); // Mảng chứa các ngày sẽ được hiển thị
  // const [bookingTable, setBookingTable] = useState({}) // để lưu thông tin lấy từ local(thứ, ngày, tháng, năm và giờ) ra để gửi qua back
  const navigate = useNavigate();

  let token = localStorage.getItem("token");
  if (token) {
    token = JSON.parse(token);
  }

  // Cấu hình ngày tháng động từ hôm nay đến 14 ngày
  useEffect(() => {
    const currentDate = new Date();
    const upcomingDates = [];

    for (let i = 0; i < 14; i++) {
      // Giới hạn chỉ tạo 14 ngày
      const date = {
        day: currentDate.toLocaleString("vi-VN", { weekday: "long" }),
        date: currentDate.getDate(),
      };
      upcomingDates.push(date);
      currentDate.setDate(currentDate.getDate() + 1);
    }
    setDates(upcomingDates);
  }, []);

  const handleDateClick = (date) => {
    // console.log(date);
    setSelectedDate(date);
  };

  const handleCustomTimeChange = (type, value) => {
    const [hour, minute] = customTime.split(":"); // Tách giờ và phút từ customTime
    if (type === "hour") {
      setCustomTime(`${value}:${minute}`); // Cập nhật giờ
    } else if (type === "minute") {
      setCustomTime(`${hour}:${value}`); // Cập nhật phút
    }

  };

  function handleContinue(event) {
    event.preventDefault();
    let flag = true;
    // const regex = /^([01]?[0-9]|2[0-3]):([0-5][0-9])$/;

    if (!token) {
      toast.error("Vui lòng đăng nhập");
      flag = false;
    } else if (!selectedDate) {
      toast.error("Vui lòng chọn ngày");
      flag = false;
    } 
   
    else {
      // Kiểm tra thời gian nhập lớn hơn hiện tại ít nhất 1 giờ
      const [inputHours, inputMinutes] = customTime.split(":").map(Number);
      // customTime chứa định dạng "hh:mm" (ví dụ: "10:30").
      // .split(":") tách thành mảng chứa giờ và phút: ["10", "30"].
      // .map(Number) chuyển đổi chuỗi thành số: [10, 30].
    
      const currentDate = new Date(); // thời gian của hiện tại
      const bookingDate = new Date( // ngày tháng năm hiện tại
      //   currentDate.getFullYear(),
      //   currentDate.getMonth(),
      // //   year,
      // //  month,
      //   currentDate.getDate(),
      //   // inputHours,
      //   // inputMinutes,
      //   // 0,
      //   // 0
      );
      console.log(bookingDate)

      if (selectedDate) {
        bookingDate.setFullYear(currentDate.getFullYear()); // Giữ nguyên năm hiện tại
        bookingDate.setMonth(currentDate.getMonth()); // Giữ nguyên tháng hiện tại
        bookingDate.setDate(selectedDate.date); // Cập nhật ngày được user chọn
        bookingDate.setHours(inputHours, inputMinutes, 0, 0); // giờ hiện tại
        console.log(bookingDate)
      }
      console.log(bookingDate.setMonth(currentDate.getMonth()))
      

      const currentTime = new Date(); // giờ hiện tại
      const oneHourLater = new Date(currentTime.getTime() + 60 * 60 * 1000);
      // oneHourLater: Tạo thời gian tương ứng 1 giờ sau thời điểm hiện tại

      if (inputHours <= 9) {
        toast.error("Quán mở cửa từ lúc 9h sáng");
        flag = false;
        return;
      }
      if (inputHours >= 22) {
        toast.error("Không thể đặt bàn sau 10 giờ tối!");
        flag = false;
        return;
      }

      if (bookingDate <= oneHourLater) {
        toast.error("Thời gian đặt bàn phải lớn hơn hiện tại ít nhất 1 tiếng");
        flag = false;
        return;
      }

      // Kiểm tra xem giờ nhập vào có sau 22:00 hay không
    }

    if (flag) {
      const bookingData = {
        customTime,
        selectedDate,
      };
      localStorage.setItem("bookingInfo", JSON.stringify(bookingData));


      // const currentDate = new Date();
      // const month = currentDate.getMonth() + 1; // Lấy tháng (0 - 11, cộng thêm 1 để thành tháng thực)
      // const year = currentDate.getFullYear();

    //   let bookingInfo = localStorage.getItem("bookingInfo");
    // if (bookingInfo) {
    //   bookingInfo = JSON.parse(bookingInfo);
    //   // console.log(bookingInfo);
    //   // console.log(bookingInfo.selectedTable);
    //   setBookingTable((prevData) => ({
    //     ...prevData,
    //     time: bookingInfo.customTime,
    //     date: `${bookingInfo.selectedDate.day}/${bookingInfo.selectedDate.date}/${month}/${year}`, // Sửa lại nếu có lỗi
    //   }));
    // }


      navigate("/checkout-table");
    }
  }
  console.log({ dates });
  console.log({ customTime });
  console.log({ selectedDate });
  // console.log(bookingTable);
  
  // console.log({selectedDate.day} - {selectedDate.date}</strong> và khung giờ <strong>{customTime})
  //
  return (
    <div className="booking-table-page">
      <div className="booking-table-container">
        <h2 className="booking-title-page">Lịch đặt bàn</h2>

        {/* Phần chọn ngày */}
        <div className="section">
          <h2 className="booking-title">Chọn ngày</h2>
          {/* <h2 className="booking-title-label">Tháng 12</h2> */}
          <div className="date-list">
            {dates.map((date, index) => (
              <div
                key={index}
                className={`date-item ${
                  selectedDate?.date === date.date ? "active" : ""
                }`}
                onClick={() => handleDateClick(date)}
              >
                <span>{date.day}</span>
                <span>{date.date}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Phần chọn giờ */}
        <div className="section">
          <h2 className="booking-title">Chọn giờ </h2>
          {selectedDate ? (
            <div className="movie-item">
              {/* Hiển thị ô input nếu người dùng đã chọn ngày */}
              <div className="movie-details">
                <div className="time-list">
                  <div>
                    {/* <input
                      type="text"
                      placeholder="Nhập giờ (ví dụ: 09:30)"
                      // value={customTime}
                      // name="customTime"
                      onChange={handleCustomTimeChange}
                      className="time-input"
                    /> */}
                    <div className="time-selector">
                      <select
                        id="hour-select"
                        onChange={(e) =>
                          handleCustomTimeChange("hour", e.target.value)
                        }
                        className="time-select"
                      >
                        {Array.from({ length: 24 }, (_, i) => (
                          <option key={i} value={i.toString().padStart(2, "0")}>
                            {i.toString().padStart(2, "0")}
                          </option>
                        ))}
                      </select>
                      <span className="time-separator">:</span>
                      <select
                        id="minute-select"
                        onChange={(e) =>
                          handleCustomTimeChange("minute", e.target.value)
                        }
                        className="time-select"
                      >
                        {Array.from({ length: 60 }, (_, i) => (
                          <option key={i} value={i.toString().padStart(2, "0")}>
                            {i.toString().padStart(2, "0")}
                          </option>
                        ))}
                      </select>
                    </div>

                    <p className="time-hint">
                      * Giờ đặt bàn hợp lệ: từ 09:00 đến 22:00 (định dạng 24
                      giờ)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <p className="loading-date">Hãy chọn ngày để chọn giờ đặt bàn.</p>
          )}
        </div>

        {/* Tiến hành thanh toán */}
        <div className="session">
          {/* <Link to="/checkout-table"> */}
          <button className="booking-table-continue" onClick={handleContinue}>
            Tiếp tục{" "}
            <i className="icon-continue">
              <FaArrowAltCircleRight />
            </i>
          </button>
          {/* </Link> */}
        </div>
      </div>
    </div>
  );
}

export default BookingTable;
