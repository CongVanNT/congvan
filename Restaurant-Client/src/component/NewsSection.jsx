import { useEffect, useState } from "react";
import "../css/NewsSection.css";

function NewsSection() {
  const [newsPosts, setNewsPosts] = useState([]);

  useEffect(() => {
    fetch("api")
      .then((response) => response.json())
      .then((data) => setNewsPosts(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="news-section">
      <h2 className="news-title">Our Latest News & Blog</h2>
      <div className="news-container">
        {newsPosts.map((post) => (
          <div key={post.id} className="news-post">
            <img className="news-image" src={post.image} alt={post.title} />
            <div className="news-content">
              <div className="news-info">{post.info}</div>
              <h3 className="news-heading">{post.title}</h3>
              <div className="news-footer">
                <a href={post.link} className="news-readmore">Read More &rarr;</a>
                <div className="news-date">{post.date}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NewsSection;
