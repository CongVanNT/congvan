import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import logo from "../assets/logo-hi5-black.png";
import { api } from '../api/index';
import { toast } from 'react-toastify';

function EmailVerification() {
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    
    const { token } = useParams();
    
    console.log(token)

    useEffect(() => {
        if (token) {
            // Gửi yêu cầu xác thực email
            api.get(`/verify-email/${token}`)
                .then(response => {
                    if (response.data.success  === true) {
                        setMessage('Xác thực thành công !');
                        toast.success("Xác thực thành thông")
                        setTimeout(() => {
                            navigate('/login'); // Chuyển hướng về trang đăng nhập sau khi xác thực thành công
                        }, 3000);
                    } else {
                        setMessage('Xác thực email thất bại. Mã xác thực không hợp lệ hoặc đã hết hạn.');
                        setTimeout(() => {
                          navigate("/register")
                      }, 5000);
                    }
                })
                .catch(error => {
                    console.log(error)
                    setMessage('Xác thực email thất bại. Mã xác thực không hợp lệ hoặc đã hết hạn.');
                    setTimeout(() => {
                      navigate("/register")
                  }, 5000);
                });
        } else {
            setMessage('Không tìm thấy mã xác thực.');
        }
    }, [token, navigate]);

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
            <form  className="form-signup">
              <input
                type="text"
                placeholder="Name"
                name="name"
              className="input-signup"
                readOnly
                // required

                // value={name}
                // onChange={(e) => setName(e.target.value)}
              />
              <input
                type="email"
                placeholder="Email"
                // required
                name="email"
                readOnly
                className="input-signup"


                // value={email}
                // onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                // required
                name="password"
              className="input-signup"
                readOnly


                // value={password}
                // onChange={(e) => setPassword(e.target.value)}
              />
              <input
                type="password"
                placeholder="Confirm Password"
              className="input-signup"
                // required
                name="c_password"
                readOnly


                // value={confirmPassword}
                // onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {/* <div className="checkbox">
                <input
                  className="checkbox-button"
                  type="checkbox"
                  id="terms"
                  required
                />
                <label htmlFor="terms">Agree to the terms and policy</label>
              </div> */}
              <button type="submit" className="btn" >
                {message}
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

export default EmailVerification;
