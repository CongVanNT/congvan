import "../css2/Blog.css";

const Blog = () => {
  return (
    <div className="blog-container">
      {/* Nội dung chính */}
      <main className="blog-main">
        <div className="blog-post">
          <div className="post-image-wrapper">
            <img
              src="https://freebw.com/templates/royate/images/blog-standard-1.jpg"
              alt="Bài viết blog 1"
              className="post-image"
            />
            <div className="post-date">
              <span>20</span>
              <span>THÁNG 6</span>
            </div>
          </div>
          <div className="post-content">
            <h2 className="post-title">Nhiều Phiên Bản Khác Nhau</h2>
            <p className="post-excerpt">
              Có nhiều biến thể của các đoạn văn của Lorem Ipsum có sẵn, nhưng
              phần lớn đã bị thay đổi theo một hình thức nào đó...
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
            <button className="read-more">XEM THÊM</button>
          </div>
        </div>

        <div className="blog-post">
          <div className="post-image-wrapper">
            <img
              src="https://freebw.com/templates/royate/images/blog-standard-2.jpg"
              alt="Bài viết blog 2"
              className="post-image"
            />
            <div className="post-date">
              <span>19</span>
              <span>THÁNG 6</span>
            </div>
          </div>
          <div className="post-content">
            <h2 className="post-title">Hiểu Biết Cơ Bản</h2>
            <p className="post-excerpt">
              Hiểu biết cơ bản về một chủ đề có thể dẫn đến sự đánh giá sâu sắc
              hơn về những phức tạp của nó...
            </p>
            <div className="post-meta">
              <img
                src="https://freebw.com/templates/royate/images/widget-person.png"
                alt="Tác giả"
                className="author-image"
              />
              <span>Được viết bởi John Doe</span>
              <span>Giáo dục / Học tập</span>
            </div>
            <button className="read-more">XEM THÊM</button>
          </div>
        </div>

        <div className="blog-post">
          <div className="post-image-wrapper">
            <img
              src="https://freebw.com/templates/royate/images/blog-standard-4.jpg"
              alt="Bài viết blog 3"
              className="post-image"
            />
            <div className="post-date">
              <span>18</span>
              <span>THÁNG 6</span>
            </div>
          </div>
          <div className="post-content">
            <h2 className="post-title">Khám Phá Công Thức Mới</h2>
            <p className="post-excerpt">
              Nấu ăn là một nghệ thuật, và khám phá công thức mới có thể là một
              cuộc phiêu lưu thú vị cho bất kỳ ai yêu thích ẩm thực...
            </p>
            <div className="post-meta">
              <img
                src="https://freebw.com/templates/royate/images/widget-person.png"
                alt="Tác giả"
                className="author-image"
              />
              <span>Được viết bởi Maria Gonzales</span>
              <span>Thực phẩm / Nấu ăn</span>
            </div>
            <button className="read-more">XEM THÊM</button>
          </div>
        </div>

        <div className="blog-post">
          <div className="post-image-wrapper">
            <img
              src="https://freebw.com/templates/royate/images/blog-standard-3.jpg"
              alt="Bài viết blog 4"
              className="post-image"
            />
            <div className="post-date">
              <span>17</span>
              <span>THÁNG 6</span>
            </div>
          </div>
          <div className="post-content">
            <h2 className="post-title">Du Lịch Thế Giới</h2>
            <p className="post-excerpt">
              Du lịch mở rộng tầm mắt của bạn về vẻ đẹp của các nền văn hóa khác
              nhau và những trải nghiệm hình thành nên con người chúng ta...
            </p>
            <div className="post-meta">
              <img
                src="https://freebw.com/templates/royate/images/widget-person.png"
                alt="Tác giả"
                className="author-image"
              />
              <span>Được viết bởi Alex Johnson</span>
              <span>Du lịch / Phiêu lưu</span>
            </div>
            <button className="read-more">XEM THÊM</button>
          </div>
        </div>
      </main>

      {/* Sidebar */}
      <aside className="blog-sidebar-custom">
        {/* Tìm kiếm */}
        <div className="sidebar-section-custom search-custom">
          <input type="text" placeholder="Tìm kiếm" />
          <button type="submit">Tìm kiếm</button>
        </div>
        {/* Thẻ cá nhân */}
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

        {/* Theo dõi Instagram */}
        <div className="sidebar-section-custom latest-posts-custom">
          <h3 className="title-instagram">Theo Dõi Instagram</h3>
          <ul className="instagram-gallery">
            <li>
              <img
                src="https://freebw.com/templates/royate/images/instagram-small-1.jpg"
                alt="Hình ảnh Instagram 1"
              />
            </li>
            <li>
              <img
                src="https://freebw.com/templates/royate/images/instagram-small-2.jpg"
                alt="Hình ảnh Instagram 2"
              />
            </li>
            <li>
              <img
                src="https://freebw.com/templates/royate/images/instagram-small-3.jpg"
                alt="Hình ảnh Instagram 3"
              />
            </li>
            <li>
              <img
                src="https://freebw.com/templates/royate/images/instagram-small-4.jpg"
                alt="Hình ảnh Instagram 4"
              />
            </li>
            <li>
              <img
                src="https://freebw.com/templates/royate/images/instagram-small-5.jpg"
                alt="Hình ảnh Instagram 5"
              />
            </li>
            <li>
              <img
                src="https://freebw.com/templates/royate/images/instagram-small-6.jpg"
                alt="Hình ảnh Instagram 6"
              />
            </li>
          </ul>
        </div>

        {/* Đám mây thẻ */}
        <div className="sidebar-section-custom latest-posts-custom">
          <h3 className="title-tagcloud">Đám Mây Thẻ</h3>
          <ul>
            <li>
              <div className="tags-custom">
                <a href="#">Tự nhiên</a>
                <a href="#">Trái cây</a>
                <a href="#">Khô</a>
                <a href="#">Thực phẩm tươi</a>
                <a href="#">Tự nhiên</a>
                <a href="#">Lành mạnh</a>
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

      {/* <div className="arrow left">
        <span className="arrow-icon prev"></span>
        <span>1</span>
        <span>2</span>
        <span>3</span>
        <span>4</span>
        <span>5</span>
        <span>6</span>
        <span className="arrow-icon next"></span>
      </div> */}
    </div>
  );
};

export default Blog;
