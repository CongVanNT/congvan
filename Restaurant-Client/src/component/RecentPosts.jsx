import "../css/RecentPosts.css";

const posts = [
  {
    id: 1,
    date: "Sept. 06, 2019",
    author: "Admin",
    title: "Taste the delicious foods in Asia",
    image: "URL_IMAGE_1", // Thay bằng URL của ảnh đầu tiên
    comments: 3,
  },
  {
    id: 2,
    date: "Sept. 06, 2019",
    author: "Admin",
    title: "Taste the delicious foods in Asia",
    image: "URL_IMAGE_2", // Thay bằng URL của ảnh thứ hai
    comments: 3,
  },
  {
    id: 3,
    date: "Sept. 06, 2019",
    author: "Admin",
    title: "Taste the delicious foods in Asia",
    image: "URL_IMAGE_3", // Thay bằng URL của ảnh thứ ba
    comments: 3,
  },
];

const RecentPosts = () => {
  return (
    <div className="recent-posts-container">
      <h2 className="recent-posts-title">Recent Posts</h2>
      <div className="posts-list">
        {posts.map((post) => (
          <div className="post-card" key={post.id}>
            <img src={post.image} alt={post.title} className="post-card-image" />
            <div className="post-card-content">
              <p className="post-card-date">
                <span className="post-card-date-text">{post.date}</span> <span className="post-author">{post.author}</span>
              </p>
              <h3 className="post-card-title">{post.title}</h3>
              <p className="post-read-more">Read more</p>
              <p className="post-comments">💬 {post.comments}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentPosts;
