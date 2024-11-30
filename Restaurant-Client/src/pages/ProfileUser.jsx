import  { useState } from 'react';
import "../css2/ProfileUser.css";
function UserProfile() {
  // Initialize state to store user information
  const [userInfo, setUserInfo] = useState({
    name: '', // User's name
    email: '', // User's email
    password: '', // User's password
    confirmPassword: '', // Password confirmation
    phone: '', // User's phone number
    avatar: 'https://via.placeholder.com/150', // Default avatar image
  });

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  // Handle avatar change
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUserInfo({ ...userInfo, avatar: imageUrl });
    }
  };

  // Handle user profile update
  const handleUpdate = () => {
    console.log('Updated user information:', userInfo);
    // Add logic to handle the updated information (e.g., send to a server)
  };

  // Handle logout
  const handleLogout = () => {
    console.log('User has logged out');
    // Add logic for logout (e.g., clear user data, redirect)
  };

  return (
    <div className="profile-container">
      {/* Main Container */}
      <div className="profile-card">
        <div className="profile-grid">
          {/* Sidebar (left) */}
          <div className="sidebar">
            <button
              className="back-button"
              onClick={() => window.history.back()}
            >
              ← Trở về
            </button>
            <div className="avatar-container">
              <img
                src={userInfo.avatar}
                alt="User Avatar"
                className="avatar"
              />
              {/* Label for avatar upload */}
              <label
                htmlFor="avatar-upload"
                className="avatar-upload-label"
              >
                +
              </label>
              <input
                type="file"
                id="avatar-upload"
                onChange={handleAvatarChange}
                className="avatar-upload-input"
              />
            </div>
            <h2 className="user-name">{userInfo.name || 'Tên người dùng'}</h2>
            <button
              onClick={handleLogout}
              className="logout-button"
            >
              Đăng xuất
            </button>
          </div>

          {/* User Update Form (right) */}
          <div className="form-container">
            <h2 className="form-title">Cập nhật người dùng</h2>
            <div className="form-grid">
              {/* Left Section */}
              <div className="form-left">
                <div className="form-group">
                  <label className="form-label">Tên</label>
                  <input
                    type="text"
                    name="name"
                    value={userInfo.name}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="Nhập tên của bạn"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={userInfo.email}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="Nhập email của bạn"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Mật khẩu</label>
                  <input
                    type="password"
                    name="password"
                    value={userInfo.password}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="Nhập mật khẩu của bạn"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Nhập lại mật khẩu</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={userInfo.confirmPassword}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="Nhập lại mật khẩu"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Điện thoại</label>
                  <input
                    type="text"
                    name="phone"
                    value={userInfo.phone}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="Nhập số điện thoại của bạn"
                  />
                </div>
              </div>

              {/* Right Section */}
              <div className="form-right">
                {/* Facebook URL Input */}
                <div className="social-input">
                  <input
                    type="text"
                    name="facebook"
                    className="social-input-field"
                    placeholder="Facebook URL"
                  />
                  <span className="social-icon">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
                      alt="Facebook logo"
                      className="icon"
                    />
                  </span>
                </div>
                {/* Google URL Input */}
                <div className="social-input">
                  <input
                    type="text"
                    name="google"
                    className="social-input-field"
                    placeholder="Google URL"
                  />
                  <span className="social-icon">
                    <img
                      src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png"
                      alt="Google logo"
                      className="icon"
                    />
                  </span>
                </div>
              </div>
            </div>
            <div className="form-submit">
              <button
                onClick={handleUpdate}
                className="submit-button"
              >
                Cập Nhật
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
