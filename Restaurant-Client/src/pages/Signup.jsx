import "../style/Signup.css";
import logo from "../assets/logo-hi5-black.png";
import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
import { useEffect, useState } from "react";
import { api } from "../api";
import { toast } from "react-toastify";

function SignUp() {
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
    c_password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false); 
  console.log("isSubmitting:", isSubmitting);
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token)

    if (token) {
      navigate("/");
    }
  }, []);

  const handleChangeInputs = (event) => {
    const { name, value } = event.target;
    console.log(name, value)
    setInputs((prevInputs) => ({ ...prevInputs, [name]: value })); // dấu tròn là return về luôn
  }; // change để lưu dữ liệu ng dùng đang nhập
  console.log(inputs);

  function handleSubmit(event) {
    event.preventDefault();
    let flag = true;
    // let regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!inputs.name){
      flag = false;
    }
    if(!inputs.email){
      flag = false;
    }else if(!regex.test(inputs.email)){
      toast.error("Vui lòng nhập đúng định dạng email")
      flag = false;
      setIsSubmitting(false);
    }
    if(!inputs.password){
      flag = false;
    }else if(!inputs.c_password){
      flag = false;
    }else if(inputs.password != inputs.c_password){
      toast.error("Mật khẩu nhập lại không đúng")
      flag = false;
      setIsSubmitting(false);
    }
    if(!flag){
      setIsSubmitting(false);
      toast.error("Vui lòng nhập đầy đủ thông tin")
    }else{
      setIsSubmitting(true);
      toast.info("Vui lòng đợi một lát")
      api
      .post("/register", inputs)
      .then((response) =>{
      
        console.log(response)
          if(response.data.data.verification_required === true || response.data.success === true){
            toast.info("Đăng kí thành công, Vui lòng kiểm tra email của bạn để xác thực tài khoản")
          }      
      })
      .catch(error =>{
        console.log(error)
        // if(error){
        //   toast.error("Có lỗi xảy ra")
        // }
        // if(error.response.data.success === false){
        //   toast.warning("Mật khẩu nhập lại không khớp")
        // }
      })
      .finally(() => {
        setIsSubmitting(false); // Đặt isSubmitting thành false khi yêu cầu hoàn tất
      });

    }

  }
  return (
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
            <form className="form-signup" onSubmit={handleSubmit}>
              <input
              className="input-signup"
                type="text"
                placeholder="Tên của bạn"
                name="name"
                onChange={handleChangeInputs}
              />
              <input
              className="input-signup"
                type="email"
                placeholder="Email của bạn"
                name="email"
                onChange={handleChangeInputs}
              />
              <input
              className="input-signup"
                type="password"
                placeholder="Nhập mật khẩu"
                name="password"
                onChange={handleChangeInputs}
              />
              <input
              className="input-signup"
                type="password"
                placeholder="Nhập lại mật khẩu"
                name="c_password"
                onChange={handleChangeInputs}
              />
              <div className="checkbox">
                <input
                  className="checkbox-button"
                  type="checkbox"
                  id="terms"
                  required
                />
                <label htmlFor="terms">Agree to the terms and policy</label>
              </div>
              <button type="submit" className="btn" disabled={isSubmitting}>
              {isSubmitting ? 'Đang thực hiện...' : 'Register'}
              </button>
            </form>
            <p className="account">
              Already have an account?{" "}
              <Link className="redirect-link" to="/login">
                Login
              </Link>
            </p>
            <div className="social-buttons">
              <button className="facebook icon-social-network">
                <i className="fa-brands fa-facebook-f"></i>
                <p className="text-social-network">Facebook</p>
              </button>
              <button className="google icon-social-network">
                <i className="fa-brands fa-google"></i>
                <p className="text-social-network">Google</p>
              </button>
            </div>
            <p className="team-info">HightFive Team © 2024</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;