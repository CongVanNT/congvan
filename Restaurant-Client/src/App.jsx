import "./App.css";
import Footer from "./component/Footer";

import Header from "./component/Header2";
import { Outlet, useLocation } from "react-router-dom";

// import { Outlet, useLocation } from "react-router-dom";

function App() {
  const location = useLocation(); // Lấy thông tin đường dẫn hiện tại

  // Kiểm tra xem đường dẫn có phải là login hoặc signup hay không
  const isAuthPage =
    location.pathname === "/login" ||
    location.pathname === "/signup" ||
    location.pathname === "/forgot-password" ||
    location.pathname.includes("/reset-password") ||
    location.pathname.includes("/verify-email");
  // console.log("Current Path:", location.pathname);
  // console.log("Is Auth Page:", isAuthPage);

  return (
    <div>
      {!isAuthPage && <Header />}
      <Outlet />
      {!isAuthPage && <Footer />}
    </div>
  );
}

export default App;
