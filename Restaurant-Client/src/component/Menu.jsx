import { useEffect, useState } from "react";
import { CiStar } from "react-icons/ci";
import "../css/Menu.css";
import axios from "axios";

function Menu() {
  const [products, setProducts] = useState([]); // State cho sản phẩm
  const [categories, setCategories] = useState([]); // State cho danh mục
  const [loading, setLoading] = useState(true); // State cho loading
  const [error, setError] = useState(null); // State cho lỗi

  useEffect(() => {
    const fetchProductsAndCategories = async () => {
      try {
        const productResponse = await axios.get("YOUR_PRODUCT_API_URL_HERE"); // Thay URL API sản phẩm
        const categoryResponse = await axios.get("YOUR_CATEGORY_API_URL_HERE"); // Thay URL API danh mục
        setProducts(productResponse.data); // Cập nhật state sản phẩm
        setCategories(categoryResponse.data); // Cập nhật state danh mục
      } catch (err) {
        setError(err); // Cập nhật lỗi nếu có
      } finally {
        setLoading(false); // Đánh dấu là đã loading xong
      }
    };

    fetchProductsAndCategories(); // Gọi hàm fetchProductsAndCategories
  }, []); // Chạy 1 lần khi component mount

  if (loading) return <div>Loading...</div>; // Hiển thị loading khi đang tải
  if (error) return <div>Error: {error.message}</div>; // Hiển thị lỗi nếu có

  return (
    <div className="menu-header">
      <h4 className="menu-subtitle">Food Menu</h4>
      <h1 className="menu-title">Our Specials Menu</h1>
      <div className="menu-buttons">
        {categories.map((category, index) => (
          <button className="menu-button" key={index}>
            {category.name} {/* Hiển thị tên danh mục */}
          </button>
        ))}
      </div>

      <div className="product-container">
        <div className="product-grid">
          {products.map((item) => (
            <div className="product-card" key={item.id}>
              <img
                className="product-image"
                src={item.imageUrl || "https://wp.validthemes.net/restan/wp-content/uploads/2024/05/13-1.jpg"} // Hiển thị ảnh sản phẩm nếu có
                alt={item.title || "Product Image"}
              />
              <div className="product-info">
                <CiStar className="product-star" />
                <span className="product-rating">{item.rating || "5.00"}</span>
                <span className="product-reviews">({item.reviews || "0"})</span>
                <span className="product-price">$ {item.price}</span>
              </div>
              <div className="product-details">
                <h1 className="product-title">{item.title}</h1>
                <ul className="product-ingredients">
                  {item.ingredients && item.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
                </ul>
                <button className="product-add-cart">Add to cart</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Menu;
