import "../style/About.css";
import OurPartner from "../component/OurPartner";
import OurMasterChef from "../component/OurMasterChef";
import BannerAbout from "../assets/banner-about.jpg";
import ImgAbout1 from "../assets/img-booking2.jpg";
import ImgAbout2 from "../assets/img-about-introduce.jpg";
import sampleVideo from "../assets/video-hambergur.mp4";

const AboutPage = () => {
  const handlePhoneClick = () => {
    window.location.href = "tel:+84 346732311";
  };

  const handleEmailClick = () => {
    window.location.href = "mailto:hi5@gmail.com";
  };

  const handleWebsiteClick = () => {
    window.open("https://hi5.com", "_blank");
  };

  return (
    <div className="about-page-container">
      <div className="banner-about-page">
        <img className="bgr-about-page" src={BannerAbout} alt="" />
      </div>

      <OurPartner />

      <div className="about-page-wrapper">
        <div className="about-page-images">
          <img
            src={ImgAbout1}
            alt="Staff Serving Food"
            className="about-page-image about-image-left"
          />
          <img
            src={ImgAbout2}
            alt="Happy Staff"
            className="about-page-image about-image-right"
          />
        </div>
        <div className="about-page-content">
          <h3 className="about-page-title subtitle-vphu">Giới thiệu về chúng tôi</h3>
          <h2 className="about-page-heading title-vphu">Chào Mừng Bạn Đến Với High Five</h2>
          <p className="about-page-description text-vphu">
            Một không gian thư giãn và dễ chịu, với nhạc jazz hay, bữa tối và cocktail. The Patio Time Bar mở cửa tại trung tâm Florence.
            Quầy bar duy nhất lấy cảm hứng từ những năm 1960, hứa hẹn mang đến cho bạn trải nghiệm khó quên.
          </p>
        </div>
      </div>

      <OurMasterChef />

      <div className="opening-hours container-vphu">
        <div className="opening-hours-video">
          <div className="title-restaurant-hi5">
            <h1 className="title-restaurant-hi5 title-vphu">Hight Five</h1>
          </div>
          <video
            className="video-player"
            src={sampleVideo}
            autoPlay
            loop
            muted
            ref={(video) => video && (video.playbackRate = 1)}
          />
        </div>
        <div className="opening-hours-content">
          <h3 className="opening-hours-title subtitle-vphu">Giờ mở Cửa</h3>
          <p className="opening-hours-paragraph">
            Một không gian thư giãn, dễ chịu với nhạc jazz hay, bữa tối và cocktail. The Patio Time Bar mở cửa ngay trung tâm.
          </p>
          <p className="opening-hours-text text-vphu">
            <span className="opening-hours-day">Mở cửa hàng ngày:</span> 09:00 - 22:00
          </p>
          {/* <p className="opening-hours-text text-vphu">
            <span className="opening-hours-day">T3 Đến T5:</span> 11:00 - 12:00
          </p>
          <p className="opening-hours-text text-vphu">
            <span className="opening-hours-day">T6 Đến T7:</span> 12:00 - 13:00
          </p> */}
        </div>
      </div>

      {/* Phần thông tin liên hệ */}
      <div className="contact-page-info container-vphu text-vphu">
        <h2 className="contact-page-title subtitle-vphu">Thông Tin Liên Lạc</h2>
        <div className="contact-page-item">
          <span className="contact-page-label">Address:</span> TP.Đà Nẵng
        </div>
        <div className="contact-page-item">
          <span className="contact-page-label">SĐT:</span>
          <button className="contact-page-link" onClick={handlePhoneClick}>
            +84 346 732 311
          </button>
        </div>
        <div className="contact-page-item">
          <span className="contact-page-label">Email:</span>
          <button className="contact-page-link" onClick={handleEmailClick}>
            hi5@gmail.com
          </button>
        </div>
        <div className="contact-page-item">
          <span className="contact-page-label">Website:</span>
          <button className="contact-page-link" onClick={handleWebsiteClick}>
            hi5.com
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
