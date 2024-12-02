import '../css/OurMasterChef.css';

const chefs = [
  {
    name: "Trần Minh Quân",
    title: "Chủ Của Hàng",
    imageUrl: "https://foodandtravelgermany.de/assets/img/content/afterhours/Gordon_Headshot.jpg",
    social: ["twitter", "facebook", "google", "instagram"]
  },
  {
    name: "Lê Thị Lan Hương",
    title: "Bếp Trưởng",
    imageUrl: "https://www.ft.com/__origami/service/image/v2/images/raw/ftcms%3Acae4b86e-b77a-11e6-ba85-95d1533d9a62?source=next-article&fit=scale-down&quality=highest&width=600&dpr=1",
    social: ["twitter", "facebook", "google", "instagram"]
  },
  {
    name: "Nguyễn Minh Hải",
    title: "Đầu Bếp",
    imageUrl: "https://cdn.pastaxi-manager.onepas.vn/content/uploads/articles/lentkdau/10daubepdatnhieusaomechelin/3.jpg",
    social: ["twitter", "facebook", "google", "instagram"]
  },
  {
    name: "Lê Văn Phú",
    title: "Đầu Bếp",
    imageUrl: "https://s.wsj.net/public/resources/images/BN-XZ106_BOURDA_1000V_20180323105943.jpg",
    social: ["twitter", "facebook", "google", "instagram"]
  },
  {
    name: "Phạm Nhật Định",
    title: "Đầu Bếp",
    imageUrl: "https://cdn.pastaxi-manager.onepas.vn/content/uploads/articles/lentkdau/10daubepdatnhieusaomechelin/10.jpg",
    social: ["twitter", "facebook", "google", "instagram"]
  }
];

const MasterChef = () => {
  return (
    <div className="master-chef-container">
      <h2 className='title-our-chef title-vphu'>Đầu Bếp Của Chúng Tôi</h2>
      <div className="chefs-list">
        {chefs.map((chef, index) => (
          <div className="chef-card" key={index}>
            <img src={chef.imageUrl} alt={chef.name} />
            <div className="infomation-chef">
              <h3>{chef.name}</h3>
              <p>{chef.title}</p>
            </div>
            
            <div className="social-icons">
              {chef.social.map((network, idx) => (
                <i className={`icon-${network}`} key={idx}></i>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MasterChef;
