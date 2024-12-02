import { MdAccountCircle } from "react-icons/md";
import { MdDateRange } from "react-icons/md";
import { IoTimeSharp } from "react-icons/io5";
import { Avatar } from "../assets";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { api } from "../api";
import { sortBy } from "lodash";
// import { FaArrowTurnDown } from "react-icons/fa6";

function ProductComment(props) {
  // console.log(props);
  // eslint-disable-next-line react/prop-types
  const product = props.product;
  // eslint-disable-next-line react/prop-types
  // console.log(product.id);
  const [comment, setComment] = useState(""); // comment gửi lên
  const [comments, setComments] = useState([]); //comment get về

  let token = localStorage.getItem("token");
  // eslint-disable-next-line react/prop-types
  // console.log(`/products/${product.id}/comments`);
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
        const isBadWord = badWords.some((badWord) => word.toLowerCase().includes(badWord));
        if (isBadWord) {
          console.log(`Bad word detected: ${word}`); // Kiểm tra xem từ nào bị thay thế
        }
        return isBadWord ? "***" : word;
      })
      .join(" "); // Ghép các từ lại thành câu
  };

  useEffect(() => {
    // eslint-disable-next-line react/prop-types
    if (product && product.id) {
      // Kiểm tra nếu product.id đã có giá trị
      api
        // eslint-disable-next-line react/prop-types
        .get(`/products/${product.id}/comments`)
        .then((res) => {
          // console.log(res);
          setComments(res.data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [product]);

  const handleChangeComment = (event) => {
    const { value } = event.target;
    // console.log(value);
    setComment(value);
  };
  function handleCommentSubmit(event) {
    event.preventDefault();

    if (!token) {
      toast.error("Vui lòng đăng nhập");
    }else if(!comment){
        toast.error("Vui lòng nhập bình luận!");
    } else {
      
      token = JSON.parse(token);
      let auth = localStorage.getItem("auth");
      if (auth) {
        auth = JSON.parse(auth);

      }
      let config = {
        headers: {
          Authorization: "Bearer " + token,
          "Content-type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
      };

      const formData = new FormData();
      formData.append("user_id", auth.id);
      // eslint-disable-next-line react/prop-types
      formData.append("product_id", product.id);
      formData.append("comment", comment);
      // console.log(formData)
      api
        .post("/product-comments", formData, config)
        .then((res) => {
          console.log(res);
          if (res.data.data) {
            toast.success(res.data.message);
            api
              // eslint-disable-next-line react/prop-types
              .get(`/products/${product.id}/comments`)
              .then((res) => {
                setComments(res.data.data);
              })
              .catch((error) => {
                console.error("Failed to fetch comments:", error);
              });
            setComment("");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
  // const badWords = [
  //   "cặc",
  //   "cẹc",
  //   "qq",
  //   "cục",
  //   "cức",
  //   "buồi",
  //   "cẹc",
  //   "loz",
  //   "lồn",
  //   "lòn",
  //   "cc",
  //   "què",
  //   "tật",
  // ];

  // Hàm kiểm tra và thay thế từ bậy bạ bằng '***'
  // const filterBadWords = (text) => {
  //   // Lọc và thay thế các từ không phù hợp
  //   return text
  //     .split(" ") // Tách câu thành mảng từ
  //     .map((word) => {
  //       // Nếu từ là từ không phù hợp, thay thế bằng '***'
  //       return badWords.some((badWord) => word.toLowerCase().includes(badWord))
  //       // return badWords.includes(word.toLowerCase())
  //        ? "***" : word;
  //     })
  //     .join(" "); // Ghép các từ lại thành câu
  // };
  // const handleCommentSubmit = () => {
  //   // if (comment.trim()) {
  //   //   //sẽ trả về một bản sao của chuỗi gốc nhưng đã loại bỏ tất cả các khoảng trắng ở đầu và cuối chuỗi.
  //   //   // Lọc bình luận để thay thế từ bậy bạ
  //   //   // const filteredComment = filterBadWords(comment);
  //   //   // console.log(filteredComment);

  //   //   // setComment(filteredComment);
  //   //   // setComment("");

  //   //   // // // Reset lại textarea sau khi gửi bình luận
  //   //   // console.log("comment:", filteredComment);
  //   // }

  // };
  // console.log(comment);
  console.log(comments);
  return (
    <>
      <div className="comment-section">
        <h3>Tất cả bình luận</h3>
        <ul className="media-list">
          {sortBy(comments, "id").map((item) => {
            const filteredComment = filterBadWords(item.comment);
            console.log(filteredComment)
            return (
              <li key={item.id} className="media">
                <img
                  className="avatar"
                  src={
                    item.image !== null
                      ? `http://127.0.0.1:8000/${item.image}`
                      : Avatar
                  }
                  alt="User Avatar"
                />
                <div className="comment-details">
                  <div className="comment-meta">
                    <ul className="comment-meta-list">
                      <li className="comment-meta-item">
                        <i className="comment-icon">
                          <MdAccountCircle />
                        </i>
                        <p className="comment-name">{item.name}</p>
                      </li>
                      <li className="comment-meta-item">
                        <i className="comment-icon">
                          <MdDateRange />
                        </i>
                        <p className="comment-name">{item.date}</p>
                      </li>
                      <li className="comment-meta-item">
                        <i className="comment-icon">
                          <IoTimeSharp />
                        </i>
                        <p className="comment-name">{item.time}</p>
                      </li>
                    </ul>
                  </div>
                  <p className="comment-content">{filteredComment}</p>
                </div>
              </li>
            );
          })}

          {/* <li className="media second-media">
              <div className="avatar">
                <img
                  src="https://scontent.fdad3-4.fna.fbcdn.net/v/t39.30808-6/451021686_3567165343596112_987871808300877131_n.jpg?stp=dst-jpg_p526x296&_nc_cat=104&ccb=1-7&_nc_sid=833d8c&_nc_ohc=HcSxLjVaVFIQ7kNvgFRmCm4&_nc_zt=23&_nc_ht=scontent.fdad3-4.fna&_nc_gid=A3xUAdbDsoCUEymSCQ2zC8e&oh=00_AYCDOLkoVgn8P58WiharXst2cq6V8vhmCxzVGmoTQhkSlQ&oe=671CD678"
                  alt="User Avatar"
                />
              </div>
              <div className="comment-details">
                <div className="comment-meta">
                  <ul className="comment-meta-list">
                    <li className="comment-meta-item">
                      <i className="comment-icon">
                        <MdAccountCircle />
                      </i>
                      <p className="comment-name">LanHuong</p>
                    </li>
                    <li className="comment-meta-item">
                      <i className="comment-icon">
                        <MdDateRange />
                      </i>
                      <p className="comment-name">22/10/2024</p>
                    </li>
                    <li className="comment-meta-item">
                      <i className="comment-icon">
                        <IoTimeSharp />
                      </i>
                      <p className="comment-name">10:14 a.m</p>
                    </li>
                  </ul>
                </div>
                <p className="comment-content">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </p>
                <div className="comment-replay">
                  <i className="replay-icon">
                    <FaArrowTurnDown />
                  </i>
                  <span className="replay-text">Replay</span>
                </div>
              </div>
            </li> */}
        </ul>
        <div className="comment-input">
          <textarea
            value={comment}
            rows="11"
            onChange={handleChangeComment}
            className="comment-textarea"
            placeholder="Viết bình luận của bạn..."
          ></textarea>
          <button className="comment-submit" onClick={handleCommentSubmit}>
            Gửi bình luận
          </button>
        </div>
      </div>
    </>
  );
}

export default ProductComment;
