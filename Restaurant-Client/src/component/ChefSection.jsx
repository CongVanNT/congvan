import { useEffect, useState } from "react";
import "../css/ChefSection.css";

function ChefSection() {
  const [chefs, setChefs] = useState([]);

  useEffect(() => {
    fetch("api")
      .then((response) => response.json())
      .then((data) => setChefs(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="chef-section">
      <div className="chef-header">
        <img
          className="chef-icon"
          src="https://wp.validthemes.net/restan/wp-content/uploads/2024/05/Subtittle-shape-1.png"
          alt="Icon"
        />
        <h1 className="chef-title">MASTER CHEFS</h1>
        <img
          className="chef-icon"
          src="https://wp.validthemes.net/restan/wp-content/uploads/2024/04/18.png"
          alt="Icon"
        />
      </div>
      <h2 className="chef-subtitle">Meet Our Special Chefs</h2>
      <div className="chef-grid">
        {chefs.map((chef) => (
          <div key={chef.id} className="chef-card">
            <img className="chef-image" src={chef.image} alt={chef.name} />
            <h3 className="chef-name">{chef.name}</h3>
            <p className="chef-position">{chef.position}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChefSection;
