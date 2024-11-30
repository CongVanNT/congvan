import "../style/About.css";
import HomeSection from "../component/HomeSection";
import OurPartner from "../component/OurPartner";
import ImgAbout1 from "../assets/img-booking2.jpg";
import ImgAbout2 from "../assets/img-about-introduce.jpg";
import sampleVideo from "../assets/video-hambergur.mp4";

function About() {
  return (
    <div className="about-page-container">
      <HomeSection />
      <OurPartner />

      <div className="about-page-wrapper">
        <div className="about-page-images">
          <img src={ImgAbout1} alt="Staff Serving Food" className="about-page-image about-image-left" />
          <img src={ImgAbout2} alt="Happy Staff" className="about-page-image about-image-right" />
        </div>
        <div className="about-page-content">
          <h3 className="about-page-title subtitle-vphu">About Us</h3>
          <h2 className="about-page-heading title-vphu">Chào Mừng Bạn Đến Với High Five</h2>
          <p className="about-page-description text-vphu">
            Một không gian thư giãn và dễ chịu, với nhạc jazz hay, bữa tối và cocktail. The Patio Time Bar mở cửa tại trung tâm Florence.
            Quầy bar duy nhất lấy cảm hứng từ những năm 1960, hứa hẹn mang đến cho bạn trải nghiệm khó quên.
          </p>
          <button className="about-page-button">Xem Thêm</button>
        </div>
      </div>

      <div className="opening-hours container-vphu">
        <div className="opening-hours-video">
            <div className="title-restaurant-hi5">
                <h1 className="title-restaurant-hi5 title-vphu">Hight Five</h1>
            </div>
          <video className="video-player" src={sampleVideo} autoPlay loop muted ref={(video) => video && (video.playbackRate = 1)} />
        </div>
        <div className="opening-hours-content">
          <h3 className="opening-hours-title subtitle-vphu">Mở Cửa</h3>
          <p className="opening-hours-paragraph">
            Một không gian thư giãn, dễ chịu với nhạc jazz hay, bữa tối và cocktail. The Patio Time Bar mở cửa ngay trung tâm.
          </p>
          <p className="opening-hours-text text-vphu">
            <span className="opening-hours-day">CN Đến T3:</span> 11:00 - 10:00
          </p>
          <p className="opening-hours-text text-vphu">
            <span className="opening-hours-day">T3 Đến T5:</span> 11:00 - 12:00
          </p>
          <p className="opening-hours-text text-vphu">
            <span className="opening-hours-day">T6 Đến T7:</span> 12:00 - 13:00
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
