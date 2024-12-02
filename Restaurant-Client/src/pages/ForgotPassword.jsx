import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo-hi5-black.png";
import { useEffect, useState } from "react";
import { api } from "../api";
import { toast } from "react-toastify";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate()

  const handleChangeInputs = (event) => {
    setEmail(event.target.value);
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token)

    if (token) {
      navigate("/");
    }
  }, []);
  function handleSubmit(e) {
    e.preventDefault();
    let flag = true;
    // let regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!email){
      flag = false;
    }else if(!regex.test(email)){
      toast.error("Vui lòng nhập đúng định dạng email")
      flag = false
      setIsSubmitting(false);
    }
    if(!flag){
      setIsSubmitting(false);
      toast.error("Vui lòng nhập email của bạn")
    }else{
      setIsSubmitting(true);
      api
        .post("/forgot-password",{email})
        .then((res) => {
          console.log(res);
          if(res.data.email_sent === true){
              toast.success(res.data.message)
          }
        })
        .catch((error) => {
          console.log(error);
          toast.error("Có lỗi xảy ra")
        })
        .finally(()=>{
          setIsSubmitting(false)
        })
    }
  }
  console.log(email);
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
              <p className="error">{}</p>
              <form onSubmit={handleSubmit}>
                <input
                className="input-login"
                  type="text"
                  placeholder="Email của bạn"
                  name="email"
                  onChange={handleChangeInputs}
                />

                <button type="submit" className="btn" disabled={isSubmitting}>
                  {isSubmitting ? "Đang thực hiện..." : "Lấy lại mật khẩu"}
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

export default ForgotPassword;
