import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import 'bootstrap/dist/css/bootstrap.min.css';

import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import App from './App.jsx';
import HomePage from './pages/HomePage.jsx';
import Contact from './pages/Contact.jsx';
import Login from './pages/Login.jsx';
import SignUp from './pages/Signup.jsx';
import CartProduct from './pages/CartProduct.jsx';
import ProductDetail from './pages/Product-detail.jsx';
import Blog from './pages/Blog.jsx';
import ProfileUser from './pages/ProfileUser.jsx';
import FavouritePage from './pages/FavouritePage.jsx';
import MenuPage from './pages/MenuPage.jsx';
import About from './pages/About.jsx';



createRoot(document.getElementById('root')).render(
  <Router>
  
      <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} /> 
        <Route path="/contact" element={<Contact/>} /> 
        <Route path="/login" element={<Login/>} /> 
        <Route path="/signup" element={<SignUp/>} /> 
        <Route path="/cart" element={<CartProduct/>} /> 
        <Route path="/product-detail" element={<ProductDetail/>} /> 
        <Route path="/blog" element={<Blog/>} /> 
        <Route path="/favourite-page" element={<FavouritePage/>} /> 
        <Route path="/profile-user" element={<ProfileUser/>} /> 
        <Route path="/menu" element={<MenuPage/>} /> 

        <Route path="/about" element={<About/>} />
        

       
      </Route>
      </Routes>
    <ToastContainer autoClose="2000"/>
  </Router>
);
