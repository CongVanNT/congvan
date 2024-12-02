import '../css/BookingForm-2.css';
import imgBoking2 from '../assets/img-booking2.jpg';

function BookingForm() {
  return (
    <div className="bgr-booking">
      <div className="booking-container">
        <div className="wrapper-booking">
          <div className="booking-section">
            <h1 className="title-booking">Book a table</h1>
            <form className="booking-form">
              <div className="form-group">
                <label htmlFor="phone" className="label-booking">Phone</label>
                <input type="text" id="phone" className="input-booking" placeholder="+4733378901" />
              </div>

              <div className="form-group">
                <label htmlFor="person" className="label-booking">Person</label>
                <select id="person" className="select-booking">
                  <option>1 Person</option>
                  <option>2 People</option>
                  <option>3 People</option>
                  <option>4 People</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="date" className="label-booking">Date</label>
                <input type="date" id="date" className="input-booking" />
              </div>

              <div className="form-group">
                <label htmlFor="time" className="label-booking">Time</label>
                <input type="time" id="time" className="input-booking" defaultValue="10:00 AM" />
              </div>

              <button type="submit" className="button-booking">Book A Table</button>
            </form>
          </div>

          <div className="image-section">
            <img src={imgBoking2} alt="Waiter serving food" className="image-booking2" />
          </div>
        </div>

        <div className="hours-section">
          <h2 className="hours-title">Opening Hours</h2>
          <ul className="hours-list">
            <li className="hours-item">
              <span className="day">Saturday:</span>
              <span className="time">6:00 am - 12:00 pm</span>
            </li>
            <li className="hours-item">
              <span className="day">Sunday:</span>
              <span className="time">8:30 am - 11:00 pm</span>
            </li>
            <li className="hours-item">
              <span className="day">Monday:</span>
              <span className="time">9:00 am - 10:30 pm</span>
            </li>
            <li className="hours-item">
              <span className="day">Tuesday:</span>
              <span className="time">8:00 am - 12:00 pm</span>
            </li>
            <li className="hours-item">
              <span className="day">Wednesday:</span>
              <span className="time">9:45 am - 10:00 pm</span>
            </li>
            <li className="hours-item">
              <span className="day">Thursday:</span>
              <span className="time">8:15 am - 12:00 pm</span>
            </li>
            <li className="hours-item-closed">
              <span className="day">Friday:</span>
              <div className="closed-day">
                <span className="time">Closed</span>
              </div>
            </li>
          </ul>
          <div className="bgr-booking-2">
            <div className="animation-background"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookingForm;
