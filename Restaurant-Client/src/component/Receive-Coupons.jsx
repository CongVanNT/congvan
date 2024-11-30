import '../css/Receive-Coupons.css';
import ImageVoucher from '../assets/anh3.jpg';
import Slider from 'react-slick';

const ReceiveCoupons = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          dots: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          dots: true,
        },
      },
      {
        breakpoint: 580,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
        },
      },
    ],
  };

  return (
    <div className="receive-coupon container-vphu">
      <div className="receive-coupon-wrapper">
        <div className="receive-coupon-title">
          <h3 className='title-receive-coupon subtitle-vphu'>VOUCHER GIẢM GIÁ</h3>
        </div>
        <Slider {...settings}>
          {Array(5).fill().map((_, index) => (
            <div className="receive-coupon-item" key={index}>
              <img className='receive-coupon-image' src={ImageVoucher} alt="Image voucher" />
              <div className="receive-coupon-btn">Đặt Bàn</div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default ReceiveCoupons;
