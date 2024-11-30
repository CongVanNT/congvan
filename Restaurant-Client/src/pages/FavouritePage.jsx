import { useState } from "react"; // Importing React and useState hook
import { FaCheck, FaTimes } from "react-icons/fa";
import "../css2/Favourite.css"; // Ensure the path is correct

const productsData = [
  {
    id: 1,
    name: "Beef Burger",
    price: "$12.00",
    stockStatus: "In stock",
    image: "https://images2.thanhnien.vn/528068263637045248/2024/8/2/h3-1722573253571452686987.jpg",
  },
  {
    id: 2,
    name: "Chicken Burger",
    price: "$10.00",
    stockStatus: "In stock",
    image: "https://images2.thanhnien.vn/528068263637045248/2024/8/2/h3-1722573253571452686987.jpg",
  },
  {
    id: 3,
    name: "Veggie Burger",
    price: "$8.00",
    stockStatus: "Out of stock",
    image: "https://images2.thanhnien.vn/528068263637045248/2024/8/2/h3-1722573253571452686987.jpg",
  },
];

function FavouritePage() {
  const [selectedProducts, setSelectedProducts] = useState(
    new Array(productsData.length).fill(false)
  );
  const [cart, setCart] = useState([]);

  const toggleSelect = (index) => {
    const newSelection = [...selectedProducts];
    newSelection[index] = !newSelection[index];
    setSelectedProducts(newSelection);
  };

  const handleAddToCart = (product) => {
    if (product.stockStatus === "Out of stock") {
      alert("This product is out of stock and cannot be added to the cart.");
      return;
    }
    setCart((prevCart) => [...prevCart, product]);
    alert("Sản phẩm đã thêm vào giỏ hàng: " + product.name);
  };

  const handleRemoveFromCart = (product) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== product.id));
    alert("Sản phẩm đã được xóa khỏi giỏ hàng: " + product.name);
  };

  const handleAddSelectedToCart = () => {
    const selectedItems = productsData.filter(
      (_, index) =>
        selectedProducts[index] &&
        productsData[index].stockStatus === "In stock"
    );
    setCart((prevCart) => [...prevCart, ...selectedItems]);
    alert("Các mặt hàng đã chọn đã được thêm vào giỏ hàng.");
  };

  const handleAddAllToCart = () => {
    const inStockProducts = productsData.filter(
      (product) => product.stockStatus === "In stock"
    );
    setCart((prevCart) => [...prevCart, ...inStockProducts]);
    alert("Tất cả đã được thêm vào giỏ hàng.");
  };

  const handleRemoveAllFromCart = () => {
    setCart([]); // Clear the cart
    alert("Tất cả đã được xóa khỏi giỏ hàng.");
  };

  const handleViewCart = () => {
    console.log("Cart contents:", cart);
    alert(JSON.stringify(cart, null, 2));
  };

  const isInCart = (product) => cart.some((item) => item.id === product.id);

  return (
    <div className="favourite-container">
      <h1 className="favourite-title">Sản phẩm yêu thích</h1>
      <table className="favourite-table">
        <thead className="favourite-table-header">
          <tr>
            <th className="favourite-checkbox-header">
              <input
                type="checkbox"
                className="favourite-select-all-checkbox"
                onChange={() => {
                  const allSelected = selectedProducts.every(Boolean);
                  setSelectedProducts(
                    new Array(productsData.length).fill(!allSelected)
                  );
                }}
              />
            </th>
            <th className="favourite-product-name">Tên sản phẩm</th>
            <th className="favourite-product-price">Đơn giá</th>
            <th className="favourite-stock-status">Tình trạng kho</th>
            <th className="favourite-action-header">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {productsData.map((product, index) => (
            <tr key={product.id} className="favourite-table-row">
              <td className="favourite-checkbox-cell">
                <input
                  type="checkbox"
                  checked={selectedProducts[index]}
                  onChange={() => toggleSelect(index)}
                  className="favourite-product-checkbox"
                />
              </td>
              <td className="favourite-product-info">
                <div className="favourite-product-image-container">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="favourite-product-image"
                  />
                  <span className="favourite-product-name">{product.name}</span>
                </div>
              </td>
              <td className="favourite-product-price">{product.price}</td>
              <td className={`favourite-stock-status ${product.stockStatus === "In stock" ? "in-stock" : "out-of-stock"}`}>
                {product.stockStatus}
              </td>
              <td className="favourite-action-cell">
                <button
                  className={`favourite-add-button ${product.stockStatus === "Out of stock" ? "disabled" : "enabled"}`}
                  onClick={() => isInCart(product) ? handleRemoveFromCart(product) : handleAddToCart(product)}
                  disabled={product.stockStatus === "Out of stock"}
                >
                  <FaCheck size={20} />
                </button>
                <span className="favourite-action-separator" />
                <button
                  className={`favourite-remove-button ${isInCart(product) ? "enabled" : "disabled"}`}
                  onClick={() => handleRemoveFromCart(product)}
                  disabled={!isInCart(product)}
                >
                  <FaTimes size={20} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="favourite-action-buttons">
        <div className="favourite-button-group">
          <button onClick={handleAddSelectedToCart} className="favourite-button add-selected-button">
            Thêm mục đã chọn
          </button>
          <button onClick={handleAddAllToCart} className="favourite-button add-all-button">
            Thêm tất cả
          </button>
          <button onClick={handleRemoveAllFromCart} className="favourite-button remove-all-button">
            Xóa tất cả
          </button>
        </div>
        <div>
          <button onClick={handleViewCart} className="favourite-button view-cart-button">
            Xem giỏ hàng
          </button>
        </div>
      </div>
    </div>
  );
}

export default FavouritePage;
