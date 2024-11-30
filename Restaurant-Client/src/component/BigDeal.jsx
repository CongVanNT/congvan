import '../css/BigDeal.css';
import arrow from '../assets/arrow-deal.png';

const BigDeal = () => {
  return (
    <div className="big-deal">
      <div className='bgr-big-deal'>
        <div className="big-deal-items">
          <div className="deal-img">
            {/* Thêm ảnh hoặc content cho deal-img ở đây */}
          </div>
          <div className="deal-container">
            <div className="header-deal">
              <h4>Today Special Offer</h4>
              <img src={arrow} alt="arrow" />
            </div>
            <h2>Explore Irresistible Promotions!</h2>
            <p>
              Contrasted dissimilar get joy you instrument out reasonably. 
              Again keeps at no meant stuff. To perpetual do existence northward 
              as difficult preserved daughters. Continued at up to zealously necessary.
            </p>
            <button>Order Today</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BigDeal;
