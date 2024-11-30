import Content from "../component/Content";
import ReceiveCoupons from "../component/Receive-Coupons";
import HomeSection from "../component/HomeSection";
import BookingForm from "../component/BookingForm-3";
import OurPartner from "../component/OurPartner"
import FavoriteFood from "../component/FavoriteFood";
import AboutUs from "../component/AboutUs";
// import Menu from "../component/Menu";
import ChefSection from "../component/ChefSection";
import NewsSection from "../component/NewsSection";
import '../style/HomePage.css';
function HomePage() {
  return (
    <>
      <HomeSection />
      <ReceiveCoupons />
      <BookingForm />
      <OurPartner />
      <FavoriteFood />
      <AboutUs />
      <Content />
      {/* <Menu /> */}
      <ChefSection />
      <NewsSection />

    </>
  );
}

export default HomePage;
