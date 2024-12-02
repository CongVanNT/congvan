import '../css/Footer.css'
import logoHi5 from '../assets/logo-hi5-while.png'
export default function Footer() {
  return (
    <div className="footer">
      <div className="header-footer">
        <div className="header-footer-img"></div>
        <div className="footer-container text-vphu">
          <div className="about-us-footer">
            <h4 className='title-footer subtitle-vphu'>Về Chúng Tôi</h4>
            <p className='passage-footer'>
            Luôn vươn tới sự hoàn hảo, vì trải nghiệm của bạn là sứ mệnh của chúng tôi !
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
            <h4 className='title-footer subtitle-vphu'>Khám Phá</h4>
            <div className="text-explore-footer">
              Về Chúng Tôi
            </div>
            <div className="text-explore-footer">
              Liên Hệ
            </div>
            <div className="text-explore-footer">
              Sự Nghiệp
            </div>
            <div className="text-explore-footer">
              Hồ sơ công ty
            </div>
            <div className="text-explore-footer">
              Cần Trợ Giúp
            </div>
          </div>

          <div className="contact-info-footer">
            <h4 className='title-footer subtitle-vphu'>Liên Hệ</h4>
            <div className="contact-info-footer-item">
              <div className="icon-contact-info-footer-item icon-location-footer">
                <i className="fa-solid fa-location-dot"></i>
              </div>
              <div className="text-footer">
              116 Nguyễn Huy Tưởng, Hòa Minh, Liên Chiểu
              </div>
            </div>
            <div className="contact-info-footer-item">
              <div className="icon-contact-info-footer-item">
                <i className="fa-solid fa-phone"></i>
              </div>
              <div className="text-footer">
                +84 123 4567
              </div>
            </div>
            <div className="contact-info-footer-item">
              <div className="icon-contact-info-footer-item">
                <i className="fa-solid fa-envelope"></i>
              </div>
              <div className="text-footer">
              HightFiverestaurant@gmail.com
              </div>
            </div>
          </div>

          <div className="newsletter-footer">
            <h4 className='title-footer subtitle-vphu'>Bản Tin</h4>
            <p className="passage-footer">
              Tham gia danh sách người đăng ký của chúng tôi để nhận tin tức mới nhất và ưu đãi đặc biệt.
            </p>
            <div className="form-newsletter-footer">
              <input type="email" placeholder='Nhập Email' className='form-email-footer' name='email' />
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
