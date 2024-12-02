import { Link } from "react-router-dom";
import "../css2/Blog.css";
import { useEffect, useState } from "react";
import { api, url } from "../api";

const Blog = () => {
  const [blog, setBlog] = useState([])
  useEffect(() =>{
    api
    .get("/posts")
    .then((res) =>{
      setBlog(res.data.data)
    })
    .catch((error) =>{
      console.log(error)
    })
  }, [])
  console.log(blog)
  return (
    <div className="blog-page">
     <h1 className="title-cart-page title-vphu">Tin tức của chúng tôi</h1>
     {/* <h1 className="menu-main-title title-vphu">Thực Đơn Đặc Biệt</h1> */}
      <div className="blog-container">
        {/* Nội dung chính */}
        <main className="blog-main">
        {blog.map(item =>{
          return(
          <div className="blog-post" key={item.id}>
            <div className="post-image-wrapper">
              <img
                src={`${url}/${item.image_url}`}
                alt="Bài viết blog 1"
                className="post-image"
              />
              <div className="post-date">
                <span>{item.created_at}</span>
                {/* <span>THÁNG 6</span> */}
              </div>
            </div>
            <div className="post-content">
              <h2 className="post-title">{item.title}</h2>
              <p className="post-excerpt">
               {item.summary}
              </p>
              <div className="post-meta">
                <img
                  src="https://freebw.com/templates/royate/images/widget-person.png"
                  alt="Tác giả"
                  className="author-image"
                />
                <span>Được viết bởi Andrea Silva</span>
                <span>Tráng miệng / Nấu ăn / Thực phẩm</span>
              </div>
              <Link to={"/blog-detail/" + item.slug}><button className="read-more">XEM THÊM</button></Link>
            </div>
          </div>
          )
        })}
        </main>
  
        {/* Sidebar */}
        <aside className="blog-sidebar-custom">
          <div className="profile-card-custom">
            <img
              src="https://freebw.com/templates/royate/images/widget-person.png"
              alt="Hồ sơ"
              className="profile-image-custom"
            />
            <h3>Trần Minh Quân</h3>
            <p>Đầu bếp trưởng</p>
            <div className="signature-custom">Chữ ký</div>
          </div>
  
          {/* Danh mục */}
          <div className="sidebar-section-custom">
            <h3 className="title-categories">Danh Mục</h3>
            <ul className="categories-list-custom">
              <li>Hải sản (2)</li>
              <li>Cà phê (5)</li>
              <li>Nhà hàng (18)</li>
              <li>Bánh cupcake (22)</li>
              <li>Bữa trưa (19)</li>
            </ul>
          </div>
  
          {/* Bài viết mới nhất */}
          <div className="sidebar-section-custom latest-posts-custom">
            <h3 className="title-lastestpost">Bài Viết Mới Nhất</h3>
            <ul>
              <li>
                <img
                  src="https://freebw.com/templates/royate/images/latest-post-thumb-1.png"
                  alt="Hình thu nhỏ bài viết"
                />
                <div>
                  <span>Có nhiều biến thể</span>
                  <p>Ngày 23 tháng 7, 2018</p>
                </div>
              </li>
              <li>
                <img
                  src="https://freebw.com/templates/royate/images/latest-post-thumb-2.png"
                  alt="Hình thu nhỏ bài viết"
                />
                <div>
                  <span>Tất cả Lorem Ipsum</span>
                  <p>Ngày 23 tháng 7, 2018</p>
                </div>
              </li>
              <li>
                <img
                  src="https://freebw.com/templates/royate/images/latest-post-thumb-3.png"
                  alt="Hình thu nhỏ bài viết"
                />
                <div>
                  <span>Dòng đầu tiên của Lorem</span>
                  <p>Ngày 23 tháng 7, 2018</p>
                </div>
              </li>
              <li>
                <img
                  src="https://freebw.com/templates/royate/images/latest-post-thumb-4.png"
                  alt="Hình thu nhỏ bài viết"
                />
                <div>
                  <span>Khối chuẩn</span>
                  <p>Ngày 23 tháng 7, 2018</p>
                </div>
              </li>
            </ul>
          </div>
  
        
  
          {/* Banner Khuyến mãi */}
          <div className="sidebar-section-custom sale-banner-custom">
            {/* <h3 className="title-sale">Khuyến mãi lên đến 50%</h3> */}
            <img
              src="https://freebw.com/templates/royate/images/widget-banner.jpg"
              alt="Hình ảnh khuyến mãi"
            />
          </div>
        </aside>
      
      </div>
    </div>
  );
};

export default Blog;
