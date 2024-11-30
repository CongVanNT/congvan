import "../css/Header2.css";
import logo from "../assets/logo-hi-5.png";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

function Header2() {
  const [isNavbarVisible, setIsNavbarVisible] = useState(false);
  const navbarRef = useRef(null);
  const overlayRef = useRef(null);

  const handleToggleNavbar = () => {
    setIsNavbarVisible(!isNavbarVisible);
  };

  useEffect(() => {
    if (isNavbarVisible) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }

    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [isNavbarVisible]);

  const handleOverlayClick = () => {
    setIsNavbarVisible(false);
  };

  const handleExitClick = () => {
    setIsNavbarVisible(false);
  };

  return (
    <div className="header-2">
      <div className="header-info-bgr">
        <div className="header-info container-vphu">
          <div className="header-contact">
            <div className="header-contact-phone">
              <i className="fas fa-phone icon-contact"></i>
              <span>Điện thoại: +4733378901</span>
            </div>
            <div className="header-contact-email">
              <i className="fas fa-envelope icon-contact"></i>
              <span>Email: hi5@restan.com</span>
            </div>
          </div>
          <div className="header-social-network">
            <div className="header-social-network-item">
              <i className="fa-brands fa-facebook-f icon-social"></i>
            </div>
            <div className="header-social-network-item icon-social">
              <i className="fab fa-twitter"></i>
            </div>
            <div className="header-social-network-item icon-social">
              <i className="fab fa-youtube"></i>
            </div>
            <div className="header-social-network-item icon-social">
              <i className="fa-brands fa-linkedin-in"></i>
            </div>
          </div>
        </div>
      </div>

      <div className="header-navbar">
        <div className="navbar container-vphu" ref={navbarRef}>
          <button
            type="button"
            className="navbar-toggle"
            onClick={handleToggleNavbar}
          >
            <i className="fa fa-bars"></i>
          </button>

          <div className="logo-toggle">
            <img className="logo-image-toggle" src={logo} alt="Hi-5 Logo" />
          </div>

          <div className="header-navbar-left">
            <img className="logo-hi5" src={logo} alt="Logo Hight Five" />
          </div>

          <div className="header-navbar-right">
            <div className="change-page">
              <ul className="navbar-list">
                <li className="navbar-item">
                  <Link className="navbar-link" to="/">
                    Trang chủ
                  </Link>
                </li>
                <li className="navbar-item">
                  <Link className="navbar-link" to="/pages">
                    Giới thiệu
                  </Link>
                </li>
                <li className="navbar-item">
                  <Link className="navbar-link" to="/menu">
                    Thực đơn
                  </Link>
                </li>
                <li className="navbar-item">
                  <Link className="navbar-link" to="/blog">
                    Blog
                  </Link>
                </li>
                <li className="navbar-item">
                  <Link className="navbar-link" to="/profile-user">
                    Tài khoản
                  </Link>
                </li>
                <li className="navbar-item">
                  <Link className="navbar-link" to="/contact">
                    Liên hệ
                  </Link>
                </li>
              </ul>
            </div>

            <div
              ref={overlayRef}
              className={`overlay-screen-open ${
                isNavbarVisible ? "active" : ""
              }`}
              onClick={handleOverlayClick}
            >
              <ul className={`navbar-list ${isNavbarVisible ? "active" : ""}`}>
                <div className="header-navbar-list">
                  <div className="logo-header-navbar-list">
                    <img
                      className="logo-image-header-navbar-list"
                      src={logo}
                      alt="Hi-5 Logo"
                    />
                  </div>

                  <button
                    type="button"
                    className="button-exit"
                    onClick={handleExitClick}
                  >
                    <i
                      id="button-exit"
                      className="fa-regular fa-circle-xmark"
                    ></i>
                  </button>
                </div>
                <li className="navbar-item">
                  <Link className="navbar-link" to="/">
                    Trang chủ
                  </Link>
                </li>
                <li className="navbar-item">
                  <Link className="navbar-link" to="/pages">
                    Trang
                  </Link>
                </li>
                <li className="navbar-item">
                  <Link className="navbar-link" to="/menu">
                    Thực đơn
                  </Link>
                </li>
                <li className="navbar-item">
                  <Link className="navbar-link" to="/blog">
                    Blog
                  </Link>
                </li>
                <li className="navbar-item">
                  <Link className="navbar-link" to="/shop">
                    Cửa hàng
                  </Link>
                </li>
                <li className="navbar-item">
                  <Link className="navbar-link" to="/contact">
                    Liên hệ
                  </Link>
                </li>
              </ul>
            </div>
            <div className="cart-interaction">
              <Link to="/login">
                <div className="cart-interaction-item">
                  <i className="fa-regular fa-user navbar-icon"></i>
                </div>
              </Link>
              <Link to="/favourite-page">
                <div className="cart-interaction-item">
                  <i className="fa-regular fa-heart navbar-icon"></i>
                </div>
              </Link>
              <Link to="/cart">
                <div className="cart-interaction-item icon-end">
                  <i className="fa-solid fa-cart-shopping navbar-icon"></i>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header2;
