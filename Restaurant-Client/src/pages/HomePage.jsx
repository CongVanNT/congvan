// import Content from "../component/Content";
import ReceiveCoupons from "../component/Receive-Coupons";
import HomeSection from "../component/HomeSection";
import BookingForm from "../component/BookingForm-3";
import OurPartner from "../component/OurPartner"
import FavoriteFood from "../component/FavoriteFood";
import AboutUs from "../component/AboutUs";
import OurMasterChef from "../component/OurMasterChef";
import RecentPosts from "../component/RecentPosts";
import Menu from "../component/Menu";
// import ChefSection from "../component/ChefSection";
// import NewsSection from "../component/NewsSection";
import '../style/HomePage.css';
function HomePage() {
  return (
    <div className="home-page">
      <HomeSection />
      <FavoriteFood />
      <Menu />
      <ReceiveCoupons />
      <OurPartner />
      <AboutUs />
      <OurMasterChef />
      <BookingForm />
      <RecentPosts />
      {/* <Content /> */}
      {/* <ChefSection /> */}

    </div>
  );
}

export default HomePage;
