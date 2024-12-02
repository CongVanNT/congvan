import "../style/Login.css";
// import logohi5 from '../assets/logo-hi-5.png';
import logo from "../assets/logo-hi5-black.png";

import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../api";
import { toast } from "react-toastify";

function Login() {
const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false); 
  const navigate = useNavigate()
  
  const handleChangeInputs = (event) => {
    const { name, value } = event.target;
    // console.log(name, value)
    setInputs((prevInputs) => ({ ...prevInputs, [name]: value })); // dấu tròn là return về luôn
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token)

    if (token) {
      navigate("/");
    }
  }, []);
  
  function handleSubmit(event){
    event.preventDefault();
    let flag = true;
    // let regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!inputs.email){
      flag = false;
    }else if(!regex.test(inputs.email)){
      toast.error("Vui lòng nhập đúng định dạng email")
      flag = false
      setIsSubmitting(false);
    }
    if(!inputs.password){
      flag = false;
    }
    if(!flag){
      setIsSubmitting(false);
      toast.error("Vui lòng nhập đầy đủ thông tin")
    }else{
      setIsSubmitting(true);

      api
      .post("/login", inputs)
      .then(res =>{
          // console.log(res)
          if(res.data.success === true){
              const tokenUser = res.data.data.token
              toast.success("Đăng nhập thành công")
              console.log(tokenUser)
              localStorage.setItem("token", JSON.stringify(tokenUser)) // lưu vào local
              const auth = res.data.data.user
              localStorage.setItem("auth", JSON.stringify(auth)) // lưu vào local

              navigate("/")
          }
      })
      .catch(error=>{
          console.log(error)
          if(error.response.data.success === false){
              toast.error("Tên đăng nhập hoặc mật khẩu không chính xác")
  
          }
      })
      .finally(() => {
        setIsSubmitting(false); // Đặt isSubmitting thành false khi yêu cầu hoàn tất
      });
    }


}
console.log(inputs)

  return (
    <div className="app-login">
      <div className="wrapper-container-login">
        <div className="container-login">
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
            <form className="form-login" onSubmit={handleSubmit}>
              <input
                className="input-login"
                type="email"
                placeholder="Email"
                name="email"
                onChange={handleChangeInputs}
              />
              <input
                className="input-login"
                type="password"
                placeholder="Password"
                name="password"
                onChange={handleChangeInputs}
              />
              <button type="submit" className="btn" disabled={isSubmitting}>
              {isSubmitting ? 'Đang thực hiện...' : 'Login'}
              </button>
              <div className="forgot-password">
                <Link to="/forgot-password">Forgot password?</Link>
              </div>
            </form>
            <p className="account">
              Do not have an account?{" "}
              <Link className="redirect-link" to="/signup">
                Create an account
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

export default Login;
