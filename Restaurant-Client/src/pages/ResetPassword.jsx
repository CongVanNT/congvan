import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import logo from "../assets/logo-hi5-black.png";
import { useEffect, useState } from "react";
import { api } from "../api";
import { toast } from "react-toastify";

function ResetPassword() {
  const [input, setInput] = useState({
    password: "",
    c_password: "",
  });
  const navigate = useNavigate();
  const params = useParams();
  const token = params.token;
  

  const location = useLocation();
  const email = new URLSearchParams(location.search).get("email");
  // console.log(location)

  const [isSubmitting, setIsSubmitting] = useState(false);
  // const { token } = useParams(); (dùng destructuring):
  useEffect(() => {
    if (token) {
      toast.success("Gửi email xác thực thành công");
      toast.success("Vui lòng nhập lại mật khẩu mới của bạn");
    } else {
      toast.error("Không tìm thấy mã xác thực.");
      setTimeout(() => {
        navigate("/forgot-password");
      }, 5000);
    }
  }, []);

  const handleChangeInputs = (event) => {
    const { name, value } = event.target;
    // console.log(name, value)
    setInput((prevInputs) => ({ ...prevInputs, [name]: value })); // dấu tròn là return về luôn
  };
  function handleSubmit(e) {
    e.preventDefault();
    let flag = true;
    if (!input.password) {
      flag = false;
    } else if (!input.c_password) {
      flag = false;
    } else if (input.password != input.c_password) {
      toast.error("Mật khẩu nhập lại không đúng");
      flag = false;
      // setIsSubmitting(false);
    }

    if (!flag) {
      setIsSubmitting(false);
      toast.error("Vui lòng nhập đầy đủ thông tin");
    } else {
      const password = input.password;
      // console.log(password);
      console.log({email, password, token})
      api
        .post("/reset-password", { password, token, email })
        .then((response) => {
          console.log(response);
          if(response.data.password_reset === true){
            toast.success("Cập nhật mật khẩu thành công")
            setTimeout(() => {
              navigate('/login'); // Chuyển hướng về trang đăng nhập sau khi xác thực thành công
          }, 1000);
          }
        })
        .catch((error) => {
          console.log(error);
          if (error.response.data.password_reset === false) {
            toast.error(error.response.data.message);
          }
        });
    }
  }
  return (
    <>
      <div className="app-signup">
        <div className="wrapper-container-signup">
          <div className="container-signup">
            <div className="welcome-section">
              <h2 className="welcome-title">
                Welcome to{" "}
                <span className="highlight">HIGHTFIVE Restaurant+</span>
              </h2>
              <Link to="/">
                <img src={logo} alt="Logo" className="logo" />
              </Link>
              <p className="description">
                It has survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged.
              </p>
              <p className="copyright">Copyright Hight Five Group</p>
            </div>
            <div className="form-section">
              {/* <p className="error">{}</p> */}
              <form onSubmit={handleSubmit}>
                <input
                  className="input-login"
                  type="password"
                  placeholder="Mật khẩu"
                  name="password"
                  onChange={handleChangeInputs}
                />
                <input
                  className="input-login"
                  type="password"
                  placeholder="Nhập lại mật khẩu"
                  name="c_password"
                  onChange={handleChangeInputs}
                />

                <button type="submit" className="btn" disabled={isSubmitting}>
                  {isSubmitting ? "Đang thực hiện..." : "Cập nhật mật khẩu"}
                </button>
              </form>

              <p className="team-info">HightFive Team © 2024</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ResetPassword;
