import '../css/Header.css';
import logo from '../assets/logo.png';
import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Header() {
  const [isNavbarVisible, setIsNavbarVisible] = useState(false);
  const navbarRef = useRef(null);
  const overlayRef = useRef(null);

  const handleToggleNavbar = () => {
    setIsNavbarVisible(!isNavbarVisible);
  };

  useEffect(() => {
    if (isNavbarVisible) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }

    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, [isNavbarVisible]);

  const handleOverlayClick = () => {
    setIsNavbarVisible(false);
  };

  const handleExitClick = () => {
    setIsNavbarVisible(false);
  };

  return (
    <div className="header">
      <div className="header-top">
        <div className="reservation">
          <i className="fas fa-phone icon-phone"></i>
          <div className="information">
            <span className="reservation-text">Gọi để đặt chỗ</span>
            <a className="reservation-link" href="tel:+4733378901">+4733378901</a>
          </div>
        </div>
       <Link to="/">
          <div className="logo">
            <img className="logo-image" src={logo} alt="Logo Hi-5" />
          </div>
       </Link>
        <div className="location">
          <i className="fas fa-envelope icon-user"></i>
          <div className="login">
            <Link className="location-text" to="/login">Đăng nhập</Link>
            <Link className="location-link" to="/signup">Bạn cần tạo tài khoản?</Link>
          </div>
        </div>
      </div>
      <nav className="navbar" ref={navbarRef}>
        <button type="button" className="navbar-toggle" onClick={handleToggleNavbar}>
          <i className='fa fa-bars'></i>
        </button>

        <div className="logo-toggle">
          <img className="logo-image-toggle" src={logo} alt="Logo Hi-5" />
        </div>

        <div>
          <ul className="navbar-list">
            <li className="navbar-item"><Link className="navbar-link" to="/">Trang Chủ</Link></li>
            <li className="navbar-item"><Link className="navbar-link" to="/pages">Trang</Link></li>
            <li className="navbar-item"><Link className="navbar-link" to="/menu">Thực Đơn</Link></li>
            <li className="navbar-item"><Link className="navbar-link" to="/blog">Blog</Link></li>
            <li className="navbar-item"><Link className="navbar-link" to="/shop">Cửa Hàng</Link></li>
            <li className="navbar-item"><Link className="navbar-link" to="/contact">Liên Hệ</Link></li>
          </ul>
        </div>

        <div
          ref={overlayRef}
          className={`overlay-screen-open ${isNavbarVisible ? 'active' : ''}`}
          onClick={handleOverlayClick}
        >
          <ul className={`navbar-list ${isNavbarVisible ? 'active' : ''}`}>
            <div className='header-navbar-list'>
              <div className="logo-header-navbar-list">
                <img className="logo-image-header-navbar-list" src={logo} alt="Logo Hi-5" />
              </div>

              <button type="button" className="button-exit" onClick={handleExitClick}>
                <i id="button-exit" className="fa-regular fa-circle-xmark"></i>
              </button>
            </div>
            <li className="navbar-item"><Link className="navbar-link" to="/">Trang Chủ</Link></li>
            <li className="navbar-item"><Link className="navbar-link" to="/pages">Trang</Link></li>
            <li className="navbar-item"><Link className="navbar-link" to="/menu">Thực Đơn</Link></li>
            <li className="navbar-item"><Link className="navbar-link" to="/blog">Blog</Link></li>
            <li className="navbar-item"><Link className="navbar-link" to="/shop">Cửa Hàng</Link></li>
            <li className="navbar-item"><Link className="navbar-link" to="/contact">Liên Hệ</Link></li>
          </ul>
        </div>

        <div className="navbar-right">
          <i className="fas fa-search navbar-icon"></i>
          <i className="fas fa-bars navbar-icon"></i>
        </div>
      </nav>
    </div>
  );
}

export default Header;
