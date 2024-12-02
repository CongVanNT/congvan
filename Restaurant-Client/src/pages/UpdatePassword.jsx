import { Avatar } from "../assets";

function UpdatePassword() {
  return (
    <div className="profile-container">
      <div className="profile-card">
        {/* Sidebar bên trái */}
        <div className="sidebar">
          <div className="avatar-container">
            <img src={Avatar} alt="User Avatar" className="avatar-user" />
            <h2 className="user-name">Nguyễn Văn Anh</h2>
            {/* Dấu cộng để chọn ảnh mới */}
            <label className="avatar-plus-icon">
              +
              <input
                type="file"
                readOnly
                accept="image/*"
                //   onChange={handleChangeAvatar}
                className="avatar-input"
              />
            </label>
          </div>

          <ul className="menu-list">
            <li className="menu-item active">Thông tin cá nhân</li>
            <li className="menu-item">Đổi mật khẩu</li>
            {/* <li className="menu-item">Thiết lập tài khoản</li>
              <li className="menu-item">Báo cáo</li>
              <li className="menu-item">Thông báo</li> */}
          </ul>
          <button
        //    onClick={handleLogout}
           className="logout-btn">
            Đăng xuất
          </button>
        </div>

        {/* Form thông tin cá nhân */}
        <div className="form-container">
          <h2 className="form-title">Thông tin cá nhân</h2>
          <div className="form-group">
            <label className="form-label">Tên Người Dùng:</label>
            <input
              type="text"
              name="username"
            //   value={userInfo.username}
            //   onChange={handleInputChange}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Email:</label>
            <input
              type="text"
              name="name"
            //   value={userInfo.name}
            //   onChange={handleInputChange}
              className="form-input"
            />
          </div>
      
      
        
          <div className="form-actions">
            <button
            //  onClick={handleUpdate} 
             className="btn-save">
              Lưu thay đổi
            </button>
            <button className="btn-cancel">Hủy</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdatePassword;
