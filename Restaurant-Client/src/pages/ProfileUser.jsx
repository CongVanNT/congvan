import { useEffect, useState } from "react";
import "../css2/ProfileUser.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Avatar } from "../assets";
import { api, url } from "../api";
function ProfileUser() {
  const [userInfo, setUserInfo] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    avatar: "",
  });
  const [avatarUser, setAvatarUser] = useState(""); // hình ảnh user nếu có r nó sẽ ở đây
  const [avatar, setAvatar] = useState(""); //để luu thông tin hình ảnh để check image va size
  const [file, setFile] = useState(); // để lưu hình ảnh mã hóa và gửi qua api
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("info"); // Mặc định là 'info'

  const [passwordInfo, setPasswordInfo] = useState({
    old: "",
    new: "",
    confirm: "",
  });

  useEffect(() => {
    let auth = localStorage.getItem("auth");
    if (auth) {
      auth = JSON.parse(auth);
      console.log(auth);
      setUserInfo({
        name: auth.name,
        email: auth.email,
        // avatar: auth.image,
        phone: auth.phone_number,
      });
      setAvatarUser(auth.image);
    }
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  // Hàm xử lý đăng xuất
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("auth");
    toast.success("Đăng xuất thành công");
    navigate("/");
  };

  // Hàm xử lý thay đổi input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
    setPasswordInfo({ ...passwordInfo, [name]: value });
  };

  const handleChangeAvatar = (event) => {
    // console.log(file)
    const file = event.target.files[0]; // thông tin cá nhân

    let reader = new FileReader();

    reader.onload = (e) => {
      setFile(e.target.result); // cái này để gửi api (base 64)
      setAvatar(file); //cái này để lưu toàn bộ thông tin file upload
    };

    reader.readAsDataURL(file);

    if (file) {
      const imageUrl = URL.createObjectURL(file); // Tạo URL tạm thời cho file ảnh
      setUserInfo((prev) => ({ ...prev, avatar: imageUrl })); // để bỏ ảnh hiển thị lên giao diện
    }
  };

  function handleUpdate(e) {
    e.preventDefault();
    let flag = true;
    if (!userInfo.name) {
      toast.error("Vui lòng nhập tên của bạn");
      flag = false;
    }
    if (!userInfo.phone) {
      toast.error("Vui lòng nhập số điện thoại");
      flag = false;
    }
    if (!userInfo.address) {
      toast.error("Vui lòng nhập địa chỉ");
      flag = false;
    }
    if (!userInfo.avatar) {
      toast.error("Vui lòng chọn hình ảnh");
      flag = false;
    } else {
      if (avatar) {
        const type = avatar.type;
        const size = avatar.size;
        if (!type.includes("image")) {
          toast.error("Vui lòng chọn hình ảnh");
          flag = false;
        } else {
          if (size > 1024 * 1024) {
            toast.warning("File tải lên quá lớn");
            flag = false;
          }
        }
      }
    }

    if (flag) {
      
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
      const formData = new FormData();
      formData.append("name", userInfo.name);
      formData.append("phone_number", userInfo.phone);
      // formData.append("price", userInfo.email);
      formData.append("address", userInfo.address);
      formData.append("image", file);

      api
        .post("/update-user-info", formData, config)
        .then((res) => {
          console.log(res);
          if (res.data.success === true) {
            
            toast.success("Cập nhật thông tin thành công");
          navigate("/")

          }
        })
        .catch((error) => console.log(error));
    }
  }
  function handleUpdatePassword(e) {
    e.preventDefault();
    let flag = true;

    if (!passwordInfo.old) {
      toast.error("Vui lòng nhập mật khẩu của bạn");
      flag = false;
    }
    if (!passwordInfo.new) {
      toast.error("Vui lòng nhập mật khẩu mới");
      flag = false;
    } else if (!passwordInfo.confirm) {
      toast.error("Vui lòng nhập lại mật khẩu");
      flag = false;
    } else if (passwordInfo.new !== passwordInfo.confirm) {
      toast.error("Mật khẩu nhập lại không đúng");
      flag = false;
    }
    if (flag) {
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
      // toast.success("Đặt lại mật khẩu thành công");
      const formData = new FormData();
      formData.append("current_password", passwordInfo.old);
      formData.append("new_password",passwordInfo.new);
      formData.append("new_password_confirmation", passwordInfo.confirm);
      api
      .post("/change-password", formData, config) 
      .then((res) =>{
        console.log(res)
        if(res.data.success){
          toast.success("Mật khẩu đã được cập nhật thành công.")
          navigate("/")
        }

      })
      .catch((error) =>{
        console.log(error)
        // if(error.response.data.data.new_password){
        //   toast.warning("Mật khẩu mới phải có ít nhất 6 ký tự")
        // }
        // if(error.response.data.message){
        //   toast.warning("Mật khẩu hiện tại không đúng")
        // }
        if(error.status === 404){
          toast.warning("Mật khẩu mới phải có ít nhất 6 ký tự")

        }
        if(error.status === 400){
          toast.warning("Mật khẩu hiện tại không đúng")

        }
      })
    }
  }

  // console.log(userInfo.avatar);
  // console.log(`${url}/${avatarUser}`);
  // console.log(userInfo);
  //  console.log(userInfo.avatar)
  // console.log(avatarUser);
  console.log(passwordInfo);
  // console.log(file)
  return (
    <div className="profile-container">
      <div className="profile-card">
        {/* Sidebar bên trái */}
        <div className="sidebar">
          <div className="avatar-container">
            <img
              //  src={userInfo.avatar ? `${url}${userInfo.avatar}` : Avatar}
              src={
                userInfo.avatar // Ưu tiên ảnh mới chọn
                  ? userInfo.avatar
                  : avatarUser // Nếu không có ảnh mới, hiển thị ảnh từ API
                  ? `${url}/${avatarUser}`
                  : Avatar // Nếu không có cả hai, hiển thị ảnh mặc định
              }
              // src={ avatarUser ? (`${url}/${avatarUser}`):
              //   (userInfo.avatar ? `${url}${userInfo.avatar}` : Avatar)
              //  }
              // src={`${url}/${avatarUser}`}
              // src={userInfo.avatar || Avatar}
              alt="UserAvatar"
              className="avatar-user"
            />
            <h2 className="user-name">{userInfo.name}</h2>
            {/* Dấu cộng để chọn ảnh mới */}
            <label className="avatar-plus-icon">
              +
              <input
                type="file"
                // accept="image/*"
                onChange={handleChangeAvatar}
                className="avatar-input"
              />
            </label>
          </div>

          <ul className="menu-list">
            <li
              className={`menu-item ${activeTab === "info" ? "active" : ""}`}
              onClick={() => handleTabChange("info")}
            >
              Thông tin cá nhân
            </li>
            <li
              className={`menu-item ${
                activeTab === "password" ? "active" : ""
              }`}
              onClick={() => handleTabChange("password")}
            >
              Đổi mật khẩu
            </li>
          </ul>
          <button onClick={handleLogout} className="logout-btn">
            Đăng xuất
          </button>
        </div>

        {/* Form */}
        <div className="form-container">
          {activeTab === "info" && (
            <>
              <h2 className="form-title">Thông tin cá nhân</h2>
              <div className="form-group">
                <label className="form-label">Tên Người Dùng:</label>
                <input
                  type="text"
                  name="name"
                  value={userInfo.name}
                  onChange={handleInputChange}
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Email:</label>
                <input
                  type="text"
                  name="email"
                  value={userInfo.email}
                  readOnly
                  // onChange={handleInputChange}
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Số điện thoại:</label>
                <input
                  type="text"
                  name="phone"
                  value={userInfo.phone}
                  onChange={handleInputChange}
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Địa chỉ:</label>
                <input
                  type="text"
                  name="address"
                  // value={userInfo.address}
                  onChange={handleInputChange}
                  className="form-input"
                />
              </div>
              <div className="form-actions">
                <button onClick={handleUpdate} className="btn-save">
                  Lưu thay đổi
                </button>
                {/* <button className="btn-cancel">Hủy</button> */}
              </div>
            </>
          )}

          {activeTab === "password" && (
            <>
              <h2 className="form-title">Đổi mật khẩu</h2>
              <div className="form-group">
                <label className="form-label">Mật khẩu hiện tại:</label>
                <input
                  type="password"
                  name="old"
                  onChange={handleInputChange}
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Mật khẩu mới:</label>
                <input
                  type="password"
                  name="new"
                  onChange={handleInputChange}
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Nhập lại mật khẩu mới:</label>
                <input
                  type="password"
                  onChange={handleInputChange}
                  name="confirm"
                  className="form-input"
                />
              </div>
              <div className="form-actions">
                <button className="btn-save" onClick={handleUpdatePassword}>
                  Đổi mật khẩu
                </button>
                {/* <button className="btn-cancel">Hủy</button> */}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfileUser;
