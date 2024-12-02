import { useState, useEffect, useRef } from "react";
import "../css/OurPartner.css";
import ourPartner1 from "../assets/our-partner1.png";
import ourPartner2 from "../assets/our-partner2.png";
import ourPartner3 from "../assets/our-partner3.png";
import ourPartner4 from "../assets/our-partner4.png";
import ourPartner5 from "../assets/our-partner5.png";

function OurPartner() {
  const images = [ourPartner1, ourPartner2, ourPartner3, ourPartner4, ourPartner5];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(4); // Số lượng ảnh hiển thị
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState(0);
  const [currentTranslate, setCurrentTranslate] = useState(0);
  const slideRef = useRef(null);

  useEffect(() => {
    const updateVisibleCount = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth <= 600) {
        setVisibleCount(1); // Điện thoại: 1 hình
      } else if (screenWidth <= 1024) {
        setVisibleCount(2); // Tablet: 2 hình
      } else {
        setVisibleCount(4); // Desktop: 4 hình
      }
    };

    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);

    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isDragging) {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }
    }, 3000); // Chuyển sau 3 giây, nhưng không khi đang kéo
    return () => clearInterval(interval);
  }, [images.length, isDragging]);

  const visibleImages = images.slice(currentIndex, currentIndex + visibleCount);
  if (visibleImages.length < visibleCount) {
    visibleImages.push(...images.slice(0, visibleCount - visibleImages.length));
  }

  const handleMouseDown = (e) => {
    setIsDragging(true);
    const startX = e.pageX || e.touches[0].clientX;
    setStartPos(startX);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const currentX = e.pageX || e.touches[0].clientX;
    const diff = currentX - startPos;

    // Cập nhật vị trí của các hình ảnh khi kéo
    setCurrentTranslate(diff);

    // Cập nhật chỉ số hình ảnh nếu kéo đủ 100px
    if (diff > 100) {
      setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
      setStartPos(currentX); // Cập nhật điểm bắt đầu cho kéo tiếp theo
      setCurrentTranslate(0); // Reset lại vị trí kéo
    } else if (diff < -100) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      setStartPos(currentX); // Cập nhật điểm bắt đầu cho kéo tiếp theo
      setCurrentTranslate(0); // Reset lại vị trí kéo
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setCurrentTranslate(0); // Reset vị trí kéo sau khi thả
  };

  return (
    <div className="our-partner">
      <div className="our-partner-container container-vphu">
        <h4 className="our-partner-title subtitle-vphu">ĐỐI TÁC TIN CẬY CỦA CHÚNG TÔI</h4>
        <div
          className="slideshow-container"
          ref={slideRef}
          onMouseDown={handleMouseDown}
          onTouchStart={handleMouseDown}
          onMouseMove={handleMouseMove}
          onTouchMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onTouchEnd={handleMouseUp}
          style={{
            transform: `translateX(${currentTranslate}px)`,
            transition: isDragging ? "none" : "transform 0.5s ease-out",
          }}
        >
          {visibleImages.map((img, index) => (
            <div className="slide-our-partner" key={index}>
              <img className="our-partner-img" src={img} alt="Our Trusted Partner" />
            </div>
          ))}
        </div>
      </div>
      <div className="overlay-our-partner"></div>
    </div>
  );
}

export default OurPartner;
