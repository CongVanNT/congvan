import { useState, useEffect } from "react";

function MenuPage() {
  const slides = [
    {
      id: 1,
      title: "Awesome and delicious food",
      description:
        "Targeting consultation discover apartments. Indulgence off under folly death wrote cause her way spite. Plan upon yet way get cold spot its week. Almost do am or limits hearts. Resolve parties but why she shewing.",
      rating: "5/5",
      author: "Anthem Bu Spar",
      position: "Marketing Manager",
    },
    {
      id: 2,
      title: "Exceptional service and quality",
      description:
        "Excellence is in every detail. Beyond just food, the atmosphere and service create a wonderful experience. Highly recommended for any occasion.",
      rating: "5/5",
      author: "Liam Johnson",
      position: "Food Critic",
    },
    {
      id: 3,
      title: "A delightful dining experience",
      description:
        "The perfect blend of flavors and a welcoming environment make this a top choice. From starters to dessert, everything was spot-on.",
      rating: "5/5",
      author: "Sophia Lee",
      position: "Restaurant Enthusiast",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // const prevSlide = () => {
  //   setCurrentIndex((prevIndex) =>
  //     prevIndex === 0 ? slides.length - 1 : prevIndex - 1
  //   );
  // };

  // const nextSlide = () => {
  //   setCurrentIndex((prevIndex) =>
  //     prevIndex === slides.length - 1 ? 0 : prevIndex + 1
  //   );
  // };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === slides.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="bg-zinc-800 text-white font-sans">
      {/* Thực đơn đặc biệt */}
      <div className="bg-zinc-800 py-12 px-6">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-4">
            <img
              className="w-[80px] sm:w-[100px] h-auto"
              src="https://wp.validthemes.net/restan/wp-content/uploads/2024/05/Subtittle-shape-1.png"
              alt="Subtitle shape"
            />
            <h1 className="text-[20px] text-[#826a45] font-semibold">
              MASTER CHEFS
            </h1>
            <img
              className="w-[80px] sm:w-[100px] h-auto"
              src="https://wp.validthemes.net/restan/wp-content/uploads/2024/04/18.png"
              alt="Subtitle shape"
            />
          </div>
          <h2 className="text-red-500 text-lg font-bold mt-4">FOOD MENU</h2>
          <h1 className="text-4xl font-bold mt-2 mb-4">Thực Đơn Đặc Biệt</h1>
          <div className="border-t-2 border-red-500 w-24 mx-auto"></div>
        </div>

        {/* Các danh mục món ăn với biểu tượng */}
        <div className="grid grid-cols-1 sm::grid-cols-4  justify-items-center mb-12">
          {[
            {
              src: "https://cdn-icons-png.flaticon.com/512/557/557809.png",
              label: "Món chính",
            },
            {
              src: "https://png.pngtree.com/png-vector/20240526/ourmid/pngtree-dessert-icon-on-a-plate-and-flat-design-menu-vector-png-image_6938479.png",
              label: "Tráng miệng",
            },
            {
              src: "https://img.pikbest.com/origin/09/09/16/24mpIkbEsTJb4.png!sw800",
              label: "Hải sản",
            },
            {
              src: "https://cdn.icon-icons.com/icons2/1465/PNG/512/572tropicaldrink_100418.png",
              label: "Đồ uống",
            },
          ].map((item, index) => (
            <div key={index} className="text-center group">
              <img
                src={item.src}
                alt={item.label}
                className="w-16 h-16 mx-auto transition-transform duration-300 group-hover:scale-110"
              />
              <p className="mt-2 text-white font-semibold transition-colors duration-300 group-hover:text-red-500">
                {item.label}
              </p>
            </div>
          ))}
        </div>

        {/* Menu  */}
        <div className="flex justify-center">
          <div className="bg-gray-800 text-white px-4 sm:px-8 py-6 rounded-lg shadow-lg w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                name: "Salmon Fry",
                description: "Ricotta / Goat Cheese / Beetroot",
                price: "$40.00",
                image: "https://your-image-source.com/salmon.jpg",
              },
              {
                name: "Pangasius or Basa",
                description: "Atlantic / Chips / Salad / Tartare",
                price: "$15.00",
                image: "https://your-image-source.com/pangasius.jpg",
              },
              {
                name: "Clams",
                description: "Truffle Mash / Pepper Sauce",
                price: "$45.00",
                image: "https://your-image-source.com/clams.jpg",
              },
              {
                name: "Red Crab",
                description: "Ricotta / Goat Cheese / Beetroot",
                price: "$20.00",
                image: "https://your-image-source.com/red-crab.jpg",
              },
              {
                name: "Salmon Fry",
                description: "Ricotta / Goat Cheese / Beetroot",
                price: "$40.00",
                image: "https://your-image-source.com/salmon.jpg",
              },
              {
                name: "Pangasius or Basa",
                description: "Atlantic / Chips / Salad / Tartare",
                price: "$15.00",
                image: "https://your-image-source.com/pangasius.jpg",
              },
              {
                name: "Clams",
                description: "Truffle Mash / Pepper Sauce",
                price: "$45.00",
                image: "https://your-image-source.com/clams.jpg",
              },
              {
                name: "Red Crab",
                description: "Ricotta / Goat Cheese / Beetroot",
                price: "$20.00",
                image: "https://your-image-source.com/red-crab.jpg",
              },
            ].map((item, index) => (
              <div key={index} className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 object-cover rounded-full"
                  />
                  <div>
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-gray-400 text-sm">{item.description}</p>
                  </div>
                </div>
                <span className="bg-red-500 text-white px-3 py-1 rounded-lg">
                  {item.price}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Phần slide nằm dưới menu */}
        <div className="text-center mb-12">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center space-x-4">
              <img
                className="w-[60px] sm:w-[100px] h-auto"
                src="https://wp.validthemes.net/restan/wp-content/uploads/2024/05/Subtittle-shape-1.png"
                alt="Subtitle shape"
              />
              <h1 className="text-[20px] text-[#826a45] font-semibold">
                HAPPY CUSTOMES
              </h1>
              <img
                className="w-[100px] h-auto"
                src="https://wp.validthemes.net/restan/wp-content/uploads/2024/04/18.png"
                alt="Subtitle shape"
              />
            </div>
            <h1 className="text-4xl font-bold mt-2 mb-4">
              OUR CUSTOMES FEEDBACK
            </h1>
            <div className="border-t-2 border-red-500 w-24 mx-auto"></div>
          </div>

          <div className="relative w-full max-w-2xl mx-auto mt-8 sm:mt-16 mb-10 sm:mb-20">
            <div className="flex">
              <img
                className="w-1/2 object-cover" // Chiều rộng của ảnh là 50% và giữ tỷ lệ
                src="https://channel.mediacdn.vn/thumb_w/640/2020/12/22/photo-4-16086285226371483193876.jpg"
                alt="Description"
              />
              <div className="relative h-64 flex items-center justify-center text-white p-8 w-1/2">
                {/* // Chiều rộng của slide là 50% */}
                {slides.map((slide, index) => (
                  <div
                    key={slide.id}
                    className={`absolute transition-opacity duration-500 ${
                      index === currentIndex ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <div className="text-center">
                      <p className="text-yellow-400 font-bold">{slide.rating}</p>
                      <h2 className="text-2xl font-bold">{slide.title}</h2>
                      <p className="mt-2 text-gray-300">{slide.description}</p>
                      <div className="mt-4">
                        <p className="font-semibold">{slide.author}</p>
                        <p className="text-red-500 text-sm">{slide.position}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* <button
              onClick={prevSlide}
              className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full hover:bg-gray-600"
            >
              ❮
            </button> */}
            {/* <button
              onClick={nextSlide}
              className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full hover:bg-gray-600"
            >
              ❯
            </button> */}

            <div className="ml-[50px]flex justify-center mt-4 space-x-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full ${
                    index === currentIndex ? "bg-yellow-400" : "bg-gray-500"
                  }`}
                ></button>
              ))}
            </div>
          </div>
        </div>
    </div>
  );
}

export default MenuPage;
