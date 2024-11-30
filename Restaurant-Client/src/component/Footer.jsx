import '../css/Footer.css'
import logoHi5 from '../assets/logo-hi-5.png'
export default function Footer() {
  return (
    <div className="footer">
      <div className="header-footer">
        <div className="header-footer-img"></div>
        <div className="footer-container">
          <div className="about-us-footer">
            <h4 className='title-footer'>Về Chúng Tôi</h4>
            <p className='passage-footer'>
              Đam mê nhiệt huyết là cần thiết. Bao quanh là sự yên tĩnh, cô ấy kết thúc bằng văn học. Hướng dẫn vui vẻ bị bỏ qua.
            </p>
            <div className="social-media-icons-about-us-footer">
              <div className='icon-ab-footer icon-fb-footer'>
                <i className="fa-brands fa-facebook-f"></i>
              </div>
              <div className='icon-ab-footer'>
                <i className="fa-brands fa-twitter"></i>
              </div>
              <div className='icon-ab-footer'>
                <i className="fa-brands fa-youtube"></i>
              </div>
              <div className='icon-ab-footer'>
                <i className="fa-brands fa-linkedin-in"></i>
              </div>
            </div>
          </div>

          <div className="explore-footer">
            <h4 className='title-footer'>Khám Phá</h4>
            <div className="text-explore-footer">
              Về Chúng Tôi
            </div>
            <div className="text-explore-footer">
              Liên Hệ
            </div>
            <div className="text-explore-footer">
              Nghề Nghiệp
            </div>
            <div className="text-explore-footer">
              Hồ Sơ Công Ty
            </div>
            <div className="text-explore-footer">
              Trung Tâm Hỗ Trợ
            </div>
          </div>

          <div className="contact-info-footer">
            <h4 className='title-footer'>Thông Tin Liên Hệ</h4>
            <div className="contact-info-footer-item">
              <div className="icon-contact-info-footer-item icon-location-footer">
                <i className="fa-solid fa-location-dot"></i>
              </div>
              <div className="text-footer">
                175 Phố 10h, Văn Phòng 375, Berlin, De 21562
              </div>
            </div>
            <div className="contact-info-footer-item">
              <div className="icon-contact-info-footer-item">
                <i className="fa-solid fa-phone"></i>
              </div>
              <div className="text-footer">
                +84 346732311
              </div>
            </div>
            <div className="contact-info-footer-item">
              <div className="icon-contact-info-footer-item">
                <i className="fa-solid fa-envelope"></i>
              </div>
              <div className="text-footer">
                hi5@restan.com
              </div>
            </div>
          </div>

          <div className="newsletter-footer">
            <h4 className='title-footer'>Bản Tin</h4>
            <p className="passage-footer">
              Tham gia danh sách đăng ký của chúng tôi để nhận tin tức mới nhất và các ưu đãi đặc biệt.
            </p>
            <div className="form-newsletter-footer">
              <input type="email" placeholder='Email của bạn' className='form-email-footer' name='email' />
              <button type='submit' className='button-newsletter-footer'>
                <i className="fa-solid fa-arrow-right icon-arrow-footer"></i>
              </button>
            </div>
          </div>

        </div>
      </div>
      <div className="end-footer-bgr">
        <div className="end-footer">
          <div className="logo-footer">
            <img src={logoHi5} alt="Logo HightFive Group" />
          </div>
          <div className="footer-copyright">
            <p className='text-footer-copyright text-vphu'>Copyright © 2022 Hight Five Group. All Rights Reserved.</p>
          </div>
        </div>
        <div className="end-footer-bgr-animation"></div>
      </div>
    </div>
  );
}
