import { useParams } from "react-router-dom";
import "../css2/Blog-detail.css";
import {  useEffect, useRef, useState } from "react";
import { api, url } from "../api";
import DOMPurify from 'dompurify';
// import parse from 'html-react-parser';
import { MdAccountCircle } from "react-icons/md";
import { MdDateRange } from "react-icons/md";
import { FaArrowTurnDown } from "react-icons/fa6";
import { toast } from "react-toastify";
import { Avatar } from "../assets";

export default function BlogDetail() {
  const [idComment, setIdComment] = useState(null);
  const [blogDetail, setBlogDetail] = useState({});
  const [comment, setComment] = useState(""); // comment gửi lên
  const [comments, setComments] = useState([]); //comment get về
  const params = useParams();

  const inputRef = useRef();
  
  let token = localStorage.getItem("token");
  
  useEffect(() => {
    api
    .get("/posts/" + params.slug)
    .then((res) => {
      console.log(res);
      setBlogDetail(res.data.data);
    })
    .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    if (blogDetail && blogDetail.id) {
      api
        .get(`/posts/${blogDetail.id}/comments`)
        .then((res) => {
          console.log(res);
          setComments(res.data.data);
        })
        .catch((error) => console.log(error));
    }
  }, [blogDetail]);
  const badWords = [
    "cặc",
    "cẹc",
    "qq",
    "cục",
    "cức",
    "buồi",
    "cẹc",
    "loz",
    "lồn",
    "lòn",
    "cc",
    "què",
    "địt",
    "dit",
    "me",
    "má",
    "mẹ",
  ];
  const filterBadWords = (text) => {
    return text
      .split(" ") // Tách câu thành mảng từ
      .map((word) => {
        const isBadWord = badWords.some((badWord) =>
          word.toLowerCase().includes(badWord)
        );
        if (isBadWord) {
          console.log(`Bad word detected: ${word}`); // Kiểm tra xem từ nào bị thay thế
        }
        return isBadWord ? "***" : word;
      })
      .join(" "); // Ghép các từ lại thành câu
  };

  const handleChangeComment = (event) => {
    const { value } = event.target;
    // console.log(value);
    setComment(value);
  };

  const handleClickReplay = (idComment) => {
    toast.success(idComment);
    console.log("idComment after click:", idComment);
    setIdComment(idComment); //lấy id cha làm idcomment của thg con, còn idcomment cha là 0
    inputRef.current.focus(); // hàm này để khi kick thẻ đag gắn sự kiện onClick thì nó sẽ đc chuyển tới thẻ đag đc chọn để chọt
    //hay còn gọi là focus vào textarea
  };
  console.log("Current idComment:", idComment);
  const handleCancelReply = () => {
    setIdComment(null); // Xóa bình luận cha khi hủy trả lời
    setComment(""); // Xóa nội dung bình luận
  };
  // toast.error(idComment)

  function handleCommentSubmit(event) {
    event.preventDefault();

    if (!token) {
      toast.error("Vui lòng đăng nhập");
    } else if (!comment) {
      toast.error("Vui lòng nhập bình luận");
    } else {
      token = JSON.parse(token);

      let auth = localStorage.getItem("auth");
      if (auth) {
        auth = JSON.parse(auth);
      }
      console.log(idComment);
      let config = {
        headers: {
          Authorization: "Bearer " + token,
          "Content-type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
      };

      const formData = new FormData();
      formData.append("user_id", auth.id);
      formData.append("post_id", blogDetail.id);
      formData.append("content", comment);
      idComment !== null ? formData.append("parent_id", idComment) : "";
      // formData.append("parent_id", null)
      console.log(idComment);
      // console.log("parent_id", idComment !== "null" ? idComment : "");
      // console.log(formData)

      api
        .post("/post-comments", formData, config)
        .then((res) => {
          console.log(res);
          if (res.data.data) {
            toast.success(res.data.message);

            api
            .get(`/posts/${blogDetail.id}/comments`)
            .then((res) => {
              console.log(res);
              setComments(res.data.data);
            })
            .catch((error) => console.log(error));
            setComment("");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
  const cleanHTML = blogDetail.body
  ? DOMPurify.sanitize(blogDetail.body.replace(/<hr\s*\/?>/gi, ""))
  : "";
  // console.log(params)

  console.log({ comment });
  return (
    <div className="blog-detail-page">
      <div className="container">
        <main className="main-content">
          <article>
            <header>
              {/* <div className="post-header">
                <span className="date-badge">20 JUN</span>
                <h1>Various Versions Have</h1>
              </div> */}
              <div className="post-meta">
                <img
                  src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=50&q=80"
                  alt="Andrea Silva"
                  className="avatar-blog-detail"
                />
                By <a href="#">Andrea Silva</a>
                <span className="divider">/</span>
                <a href="#">Desserts</a>
                <span className="divider">/</span>
                <a href="#">Cooking</a>
                <span className="divider">/</span>
                <a href="#">Food</a>
              </div>
            </header>

            <img
              src={`${url}/${blogDetail.image_url}`}
              alt="Fresh fish with limes"
              className="main-recipe-image"
            />

            <div className="content">
              <h2 className="post-title">{blogDetail.title}</h2>
              {/* <div className="post-excerpt" dangerouslySetInnerHTML={{ __html: cleanHTML }}>
            
              </div> */}
              <div
  className="post-excerpt"
  dangerouslySetInnerHTML={{
    __html: cleanHTML || "Không có nội dung",
  }}
></div>
              {/* <p className="post-excerpt">{blogDetail?.summary
                            ? blogDetail.summary.replace(/<\/?p>/g, "")
                            : "Không có thông tin"}</p> */}
              {/* <p className="post-excerpt">{parse(cleanHTML)}</p> */}
            </div>
            <div className="comment-section">
              <h3>Tất cả bình luận</h3>
              <ul className="">
                <ul className="comment-list">
                  {comments.map((parentComment) => {
                    const filteredComment = filterBadWords(
                      parentComment.content
                    );

                    return (
                      <div key={parentComment.id}>
                        <li className="media" key={parentComment.id}>
                          {/* Comment cha */}
                          <div >
                            <img
                              src={
                                parentComment.user.image !== null
                                  ? `http://127.0.0.1:8000/${parentComment.user.image}`
                                  : Avatar
                              }
                              alt="User Avatar"
                              className="avatar"
                            />
                          </div>
                          <div className="comment-details">
                            <div className="comment-meta">
                              <ul className="comment-meta-list">
                                <li className="comment-meta-item">
                                  <i className="comment-icon">
                                    <MdAccountCircle />
                                  </i>
                                  <p className="comment-name">
                                    {parentComment.user?.name || "Anonymous"}
                                  </p>
                                </li>
                                <li className="comment-meta-item">
                                  <i className="comment-icon">
                                    <MdDateRange />
                                  </i>
                                  <p className="comment-name">
                                    {parentComment.created_at}
                                  </p>
                                </li>
                              </ul>
                            </div>
                            <p className="comment-content">{filteredComment}</p>
                            <div className="comment-replay">
                              <i className="replay-icon">
                                <FaArrowTurnDown />
                              </i>
                              <span
                                className="replay-text"
                                onClick={() =>
                                  handleClickReplay(parentComment.id)
                                }
                              >
                                Trả lời
                              </span>
                            </div>
                          </div>
                        </li>
                        {/* Lặp qua danh sách comment con */}
                        {console.log(parentComment)}

                        {parentComment.children &&
                          parentComment.children.length > 0 && (
                            <ul className="child-comment-list">
                              {parentComment.children.map((childComment) => {
                                const filteredChildComment = filterBadWords(
                                  childComment.content
                                );
                                return (
                                  <li
                                    className="media second-media"
                                    key={childComment.id}
                                  >
                                    <div >
                                      <img
                                        src={
                                          childComment.user.image !== null
                                            ? `http://127.0.0.1:8000/${childComment.user.image}`
                                            : Avatar
                                        }
                                        alt="User Avatar"
                                        className="avatar"
                                      />
                                    </div>
                                    <div className="comment-details">
                                      <div className="comment-meta">
                                        <ul className="comment-meta-list">
                                          <li className="comment-meta-item">
                                            <i className="comment-icon">
                                              <MdAccountCircle />
                                            </i>
                                            <p className="comment-name">
                                              {childComment.user?.name ||
                                                "Anonymous"}
                                            </p>
                                          </li>
                                          <li className="comment-meta-item">
                                            <i className="comment-icon">
                                              <MdDateRange />
                                            </i>
                                            <p className="comment-name">
                                              {childComment.created_at}
                                            </p>
                                          </li>
                                        </ul>
                                      </div>
                                      <p className="comment-content">
                                        {filteredChildComment}
                                      </p>
                                    </div>
                                  </li>
                                );
                              })}
                            </ul>
                          )}
                      </div>
                    );
                  })}
                </ul>
              </ul>
              {idComment !== null && (
                <button className="close-replay" onClick={handleCancelReply}>
                  Hủy bỏ trả lời bình luận
                </button>
              )}

              <div className="comment-input">
                <textarea
                  value={comment}
                  rows="11"
                  ref={inputRef}
                  onChange={handleChangeComment}
                  className="comment-textarea"
                  placeholder="Viết bình luận của bạn..."
                ></textarea>
                <button
                  className="comment-submit"
                  onClick={handleCommentSubmit}
                >
                  Gửi bình luận
                </button>
              </div>
            </div>
          </article>
        </main>

        <aside className="blog-sidebar-custom">
          {/* Tìm kiếm */}
          {/* <div className="sidebar-section-custom search-custom">
            <input type="text" placeholder="Tìm kiếm" />
            <button type="submit">Tìm kiếm</button>
          </div> */}
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
}
