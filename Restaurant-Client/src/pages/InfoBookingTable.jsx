import "../css/InfoBookingTable.css"
function InfoBookingTable() {
    return ( 
        <>
            <div className="booking-form-container">
            <h3>Thông tin đặt bàn</h3>
            <form>
                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="name">Tên khách hàng</label>
                        <input type="text" id="name" name="name" placeholder="Nhập tên khách hàng" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone">Số điện thoại</label>
                        <input type="tel" id="phone" name="phone" placeholder="Nhập số điện thoại" />
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="table-number">Số bàn</label>
                        <input type="number" id="table-number" name="table-number" placeholder="Nhập số bàn" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="address">Địa chỉ</label>
                        <input type="text" id="address" name="address" placeholder="Nhập địa chỉ" />
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" placeholder="Nhập email" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="date">Ngày</label>
                        <input type="date" id="date" name="date" />
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="time">Giờ</label>
                        <input type="time" id="time" name="time" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="guest-count">Số khách</label>
                        <input type="number" id="guest-count" name="guest-count" placeholder="Nhập số khách" />
                    </div>
                </div>
                <button type="submit" className="btn-submit">Đặt bàn</button>
            </form>
        </div>
        </>
     );
}

export default InfoBookingTable;